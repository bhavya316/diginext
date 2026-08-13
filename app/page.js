"use client";

import { useEffect, useMemo, useState } from "react";

const navigation = ["Dashboard", "Courses", "Certificates", "Teachers", "Leads", "Settings"];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";
const TOKEN_STORAGE_KEY = "diginext-admin-token";

async function request(path, { method = "GET", token, body } = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store"
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.error || `Request failed with status ${response.status}`);
    }

    return { ok: true, data: payload?.data };
  } catch (error) {
    return { ok: false, error: error.message || "Request failed" };
  }
}

async function uploadBrochure(token, file) {
  try {
    const formData = new FormData();
    formData.append("brochure", file);

    const response = await fetch(`${API_BASE_URL}/uploads/brochures`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.error || `Upload failed with status ${response.status}`);
    }

    return { ok: true, data: payload?.data };
  } catch (error) {
    return { ok: false, error: error.message || "Upload failed" };
  }
}

async function uploadCertificateImage(token, file) {
  try {
    const formData = new FormData();
    formData.append("certificate", file);

    const response = await fetch(`${API_BASE_URL}/uploads/certificates`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.error || `Upload failed with status ${response.status}`);
    }

    return { ok: true, data: payload?.data };
  } catch (error) {
    return { ok: false, error: error.message || "Upload failed" };
  }
}

async function uploadTeacherImage(token, file) {
  try {
    const formData = new FormData();
    formData.append("teacher", file);

    const response = await fetch(`${API_BASE_URL}/uploads/teachers`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.error || `Upload failed with status ${response.status}`);
    }

    return { ok: true, data: payload?.data };
  } catch (error) {
    return { ok: false, error: error.message || "Upload failed" };
  }
}

function formatMetricValue(value) {
  return Intl.NumberFormat("en-IN").format(Number(value || 0));
}

function createEmptyCourse() {
  return {
    id: "",
    title: "",
    slug: "",
    shortDescription: "",
    durationText: "",
    deliveryMode: "",
    brochureUrl: "",
    brochureName: "",
    sortOrder: 0,
    isFeatured: false,
    status: "DRAFT",
    faqs: []
  };
}

function createEmptyFaq() {
  return {
    question: "",
    answer: ""
  };
}

function createEmptyCertificate() {
  return {
    id: "",
    title: "",
    imageUrl: "",
    imageName: "",
    sortOrder: 0,
    isVisible: true
  };
}

function createEmptyTeacher() {
  return {
    id: "",
    name: "",
    photoUrl: "",
    photoName: "",
    linkedinUrl: "",
    employmentStatus: "",
    credentials: "",
    sortOrder: 0,
    isVisible: true
  };
}

function LoginView({ onLogin, authError, isSubmitting }) {
  const [email, setEmail] = useState("admin@diginext.local");
  const [password, setPassword] = useState("DigiNext@123");

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="eyebrow">Secure Access</p>
        <h1>DigiNext Admin</h1>
        <p className="lede">Sign in to manage courses, landing page sections, settings, and lead operations.</p>
        <form
          className="admin-form"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin({ email, password });
          }}
        >
          <label>
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          {authError ? <p className="form-message error">{authError}</p> : null}
          <button type="submit" className="primary-action" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

function DashboardView({ dashboard, leads, videoSettings, onSaveVideoSettings, isSavingVideo, videoFeedback }) {
  const [videoDraft, setVideoDraft] = useState(videoSettings || {});

  useEffect(() => {
    if (videoSettings) setVideoDraft(videoSettings);
  }, [videoSettings]);

  const metrics = dashboard
    ? [
      {
        label: "New leads",
        value: formatMetricValue(dashboard.leadsByStatus.find((item) => item.status === "NEW")?._count?._all || 0),
        hint: "Current pipeline"
      },
      {
        label: "Qualified",
        value: formatMetricValue(
          dashboard.leadsByStatus.find((item) => item.status === "QUALIFIED")?._count?._all || 0
        ),
        hint: "Needs follow-up"
      },
      {
        label: "Published courses",
        value: formatMetricValue(dashboard.publishedCourses || 0),
        hint: "Live on the website"
      },
      {
        label: "City setup",
        value: "1",
        hint: "Mumbai only"
      }
    ]
    : [];

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
          <p className="lede">Authenticated admin workspace with live backend reads and guarded mutations.</p>
        </div>
      </header>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.hint}</span>
          </article>
        ))}
      </section>

      <section className="two-column">
        <article className="card">
          <p className="eyebrow">Website Settings</p>
          <h2>Homepage Video Player</h2>
          <p className="field-note">
            Configure the YouTube video link shown on the website right below the Hero section.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); onSaveVideoSettings(videoDraft); }} className="stack-form" style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
            <label style={{ display: "grid", gap: "6px" }}>
              <strong>YouTube Video URL or ID</strong>
              <input
                type="text"
                placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
                value={videoDraft.youtubeUrl || ""}
                onChange={(e) => setVideoDraft((current) => ({ ...current, youtubeUrl: e.target.value }))}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
              />
            </label>

            {videoFeedback ? <p className={videoFeedback.ok ? "form-feedback" : "form-feedback error"}>{videoFeedback.message}</p> : null}

            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={isSavingVideo}>
                {isSavingVideo ? "Saving..." : "Save Video Link"}
              </button>
            </div>
          </form>
        </article>

        <article className="card">
          <p className="eyebrow">Single-city setup</p>
          <h2>Mumbai-only content</h2>
          <ul className="section-list">
            <li>All website courses are treated as Mumbai courses.</li>
            <li>City selectors have been removed from admin forms.</li>
            <li>Leads are routed dynamically based on selected courses.</li>
          </ul>
        </article>
      </section>

      <article className="card" style={{ marginTop: "24px" }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">Lead inbox</p>
            <h2>Recent leads</h2>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>From</th>
                <th>Source</th>
                <th>Request</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(leads || []).map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email || "—"}</td>
                  <td>{lead.phone || "—"}</td>
                  <td>{lead.originLocation || "—"}</td>
                  <td>{lead.source?.replaceAll("_", " ")}</td>
                  <td>{lead.requestedAsset || "—"}</td>
                  <td>{lead.course?.title || lead.interest || "Unassigned"}</td>
                  <td>
                    <span className={`status-pill ${lead.status?.toLowerCase().replaceAll("_", "-")}`}>{lead.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function CoursesView({ courses, draft, setDraft, onFileChange, onEdit, onDelete, onSubmit, feedback, isSaving, isDeleting }) {
  return (
    <section className="workspace-grid">
      <article className="card">
        <div className="section-head">
          <div>
            <p className="eyebrow">Course CRUD</p>
            <h2>{draft.id ? "Edit course" : "Create course"}</h2>
          </div>
          <button type="button" className="secondary-action" onClick={() => setDraft(createEmptyCourse())}>
            New course
          </button>
        </div>
        <form className="admin-form two-up" onSubmit={onSubmit}>
          <label>
            <span>Status</span>
            <select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </label>
          <label>
            <span>Title</span>
            <input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} required />
          </label>
          <label>
            <span>Slug</span>
            <input value={draft.slug} onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))} required />
          </label>
          <label className="full-span">
            <span>Short description</span>
            <textarea
              rows={4}
              value={draft.shortDescription}
              onChange={(event) => setDraft((current) => ({ ...current, shortDescription: event.target.value }))}
            />
          </label>
          <label>
            <span>Duration</span>
            <input
              value={draft.durationText}
              onChange={(event) => setDraft((current) => ({ ...current, durationText: event.target.value }))}
            />
          </label>
          <label>
            <span>Delivery mode</span>
            <input
              value={draft.deliveryMode}
              onChange={(event) => setDraft((current) => ({ ...current, deliveryMode: event.target.value }))}
            />
          </label>
          <label>
            <span>Brochure</span>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(event) => onFileChange(event.target.files?.[0] || null)} />
          </label>
          <label>
            <span>Sort order</span>
            <input
              type="number"
              value={draft.sortOrder}
              onChange={(event) => setDraft((current) => ({ ...current, sortOrder: Number(event.target.value) }))}
            />
          </label>
          <div className="full-span upload-meta">
            {draft.brochureUrl ? (
              <a href={draft.brochureUrl} target="_blank" rel="noreferrer">
                Current brochure
              </a>
            ) : (
              <span>No brochure uploaded yet.</span>
            )}
            {draft.brochureName ? <span>Selected file: {draft.brochureName}</span> : null}
          </div>
          <label className="checkbox-row full-span">
            <input
              type="checkbox"
              checked={draft.isFeatured}
              onChange={(event) => setDraft((current) => ({ ...current, isFeatured: event.target.checked }))}
            />
            <span>Featured course</span>
          </label>
          <div className="full-span faq-editor">
            <div className="faq-editor__head">
              <div>
                <span className="faq-editor__label">Course FAQs</span>
                <p>Add the exact FAQs that should appear for this course on the website.</p>
              </div>
              <button
                type="button"
                className="secondary-action"
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    faqs: [...(current.faqs || []), createEmptyFaq()]
                  }))
                }
              >
                Add FAQ
              </button>
            </div>
            <div className="faq-editor__list">
              {(draft.faqs || []).length > 0 ? (
                draft.faqs.map((faq, index) => (
                  <div key={`${draft.id || "new"}-faq-${index}`} className="faq-editor__item">
                    <label className="full-span">
                      <span>Question {index + 1}</span>
                      <input
                        value={faq.question}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            faqs: (current.faqs || []).map((item, itemIndex) =>
                              itemIndex === index ? { ...item, question: event.target.value } : item
                            )
                          }))
                        }
                        placeholder="What makes this course different?"
                      />
                    </label>
                    <label className="full-span">
                      <span>Answer {index + 1}</span>
                      <textarea
                        rows={4}
                        value={faq.answer}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            faqs: (current.faqs || []).map((item, itemIndex) =>
                              itemIndex === index ? { ...item, answer: event.target.value } : item
                            )
                          }))
                        }
                        placeholder="Explain the answer shown on the website."
                      />
                    </label>
                    <button
                      type="button"
                      className="danger-action"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          faqs: (current.faqs || []).filter((_, itemIndex) => itemIndex !== index)
                        }))
                      }
                    >
                      Remove FAQ
                    </button>
                  </div>
                ))
              ) : (
                <div className="faq-editor__empty">No FAQs added yet for this course.</div>
              )}
            </div>
          </div>
          {feedback ? <p className={`form-message ${feedback.type}`}>{feedback.message}</p> : null}
          <button type="submit" className="primary-action full-span" disabled={isSaving}>
            {isSaving ? "Saving..." : draft.id ? "Update course" : "Create course"}
          </button>
        </form>
      </article>

      <article className="card">
        <p className="eyebrow">Existing courses</p>
        <h2>Published and draft tracks</h2>
        <div className="list-stack">
          {courses.map((course) => (
            <div key={course.id} className="list-card certificate-list-card">
              <button type="button" className="certificate-list-card__body" onClick={() => onEdit(course)}>
                <div>
                  <strong>{course.title}</strong>
                  <span>
                    {course.status} • {(course.faqs || []).length} FAQ{(course.faqs || []).length === 1 ? "" : "s"}
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="danger-action"
                onClick={() => onDelete(course)}
                disabled={isDeleting === String(course.id)}
              >
                {isDeleting === String(course.id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function LeadsView({ leads }) {
  return (
    <article className="card">
      <div className="section-head">
        <div>
          <p className="eyebrow">Lead inbox</p>
          <h2>Recent leads</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>From</th>
              <th>Source</th>
              <th>Request</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email || "—"}</td>
                <td>{lead.phone || "—"}</td>
                <td>{lead.originLocation || "—"}</td>
                <td>{lead.source.replaceAll("_", " ")}</td>
                <td>{lead.requestedAsset || "—"}</td>
                <td>{lead.course?.title || lead.interest || "Unassigned"}</td>
                <td>
                  <span className={`status-pill ${lead.status.toLowerCase().replaceAll("_", "-")}`}>{lead.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function TeachersView({ teachers, draft, setDraft, onFileChange, onEdit, onDelete, onSubmit, feedback, isSaving, isDeleting }) {
  return (
    <section className="workspace-grid">
      <article className="card">
        <div className="section-head">
          <div>
            <p className="eyebrow">Teacher CMS</p>
            <h2>{draft.id ? "Edit teacher" : "Add teacher"}</h2>
          </div>
          <button
            type="button"
            className="secondary-action"
            onClick={() => {
              setDraft(createEmptyTeacher());
              onFileChange(null);
            }}
          >
            New teacher
          </button>
        </div>
        <form className="admin-form two-up" onSubmit={onSubmit}>
          <label>
            <span>Sort order</span>
            <input
              type="number"
              value={draft.sortOrder}
              onChange={(event) => setDraft((current) => ({ ...current, sortOrder: Number(event.target.value) }))}
            />
          </label>
          <label>
            <span>Name</span>
            <input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} required />
          </label>
          <label>
            <span>LinkedIn URL</span>
            <input
              type="url"
              value={draft.linkedinUrl}
              onChange={(event) => setDraft((current) => ({ ...current, linkedinUrl: event.target.value }))}
            />
          </label>
          <label>
            <span>Teacher photo</span>
            <input type="file" accept=".jpg,.jpeg,.png,.webp,image/*" onChange={(event) => onFileChange(event.target.files?.[0] || null)} />
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.isVisible}
              onChange={(event) => setDraft((current) => ({ ...current, isVisible: event.target.checked }))}
            />
            <span>Visible on website</span>
          </label>
          <label className="full-span">
            <span>Employment status / credentials</span>
            <input
              value={draft.employmentStatus}
              onChange={(event) => setDraft((current) => ({ ...current, employmentStatus: event.target.value }))}
              placeholder="Senior Performance Marketer, Ex-Agency Lead, 8+ years"
            />
          </label>
          <label className="full-span">
            <span>Profile details</span>
            <textarea
              rows={5}
              value={draft.credentials}
              onChange={(event) => setDraft((current) => ({ ...current, credentials: event.target.value }))}
            />
          </label>
          <div className="full-span upload-meta">
            {draft.photoUrl ? (
              <a href={draft.photoUrl} target="_blank" rel="noreferrer">
                Current teacher image
              </a>
            ) : (
              <span>No image uploaded yet.</span>
            )}
            {draft.photoName ? <span>Selected file: {draft.photoName}</span> : null}
          </div>
          {feedback ? <p className={`form-message ${feedback.type}`}>{feedback.message}</p> : null}
          <button type="submit" className="primary-action full-span" disabled={isSaving}>
            {isSaving ? "Saving..." : draft.id ? "Update teacher" : "Create teacher"}
          </button>
        </form>
      </article>

      <article className="card">
        <p className="eyebrow">Website teachers</p>
        <h2>Current teacher set</h2>
        <div className="list-stack">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="list-card certificate-list-card">
              <button type="button" className="certificate-list-card__body" onClick={() => onEdit(teacher)}>
                <div className="certificate-thumb-wrap">
                  {teacher.photoUrl ? (
                    <img src={teacher.photoUrl} alt={teacher.name} className="certificate-thumb" />
                  ) : (
                    <div className="certificate-thumb" style={{ display: "grid", placeItems: "center", fontWeight: "bold", background: "var(--surface-alt)", height: "100%" }}>
                      {teacher.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <strong>{teacher.name}</strong>
                  <span>
                    Sort {teacher.sortOrder || 0} • {teacher.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="danger-action"
                onClick={() => onDelete(teacher)}
                disabled={isDeleting === String(teacher.id)}
              >
                {isDeleting === String(teacher.id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function CertificatesView({ certificates, draft, setDraft, onFileChange, onEdit, onDelete, onSubmit, feedback, isSaving, isDeleting }) {
  return (
    <section className="workspace-grid">
      <article className="card">
        <div className="section-head">
          <div>
            <p className="eyebrow">Certificate CMS</p>
            <h2>{draft.id ? "Edit certificate" : "Add certificate"}</h2>
          </div>
          <button
            type="button"
            className="secondary-action"
            onClick={() => {
              setDraft(createEmptyCertificate());
              onFileChange(null);
            }}
          >
            New certificate
          </button>
        </div>
        <form className="admin-form two-up" onSubmit={onSubmit}>
          <label>
            <span>Sort order</span>
            <input
              type="number"
              value={draft.sortOrder}
              onChange={(event) => setDraft((current) => ({ ...current, sortOrder: Number(event.target.value) }))}
            />
          </label>
          <label className="full-span">
            <span>Title</span>
            <input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} required />
          </label>
          <label>
            <span>Certificate image</span>
            <input type="file" accept=".jpg,.jpeg,.png,.webp,image/*" onChange={(event) => onFileChange(event.target.files?.[0] || null)} />
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={draft.isVisible}
              onChange={(event) => setDraft((current) => ({ ...current, isVisible: event.target.checked }))}
            />
            <span>Visible on website</span>
          </label>
          <div className="full-span upload-meta">
            {draft.imageUrl ? (
              <a href={draft.imageUrl} target="_blank" rel="noreferrer">
                Current certificate image
              </a>
            ) : (
              <span>No image uploaded yet.</span>
            )}
            {draft.imageName ? <span>Selected file: {draft.imageName}</span> : null}
          </div>
          {feedback ? <p className={`form-message ${feedback.type}`}>{feedback.message}</p> : null}
          <button type="submit" className="primary-action full-span" disabled={isSaving}>
            {isSaving ? "Saving..." : draft.id ? "Update certificate" : "Create certificate"}
          </button>
        </form>
      </article>

      <article className="card">
        <p className="eyebrow">Website certificates</p>
        <h2>Current certificate set</h2>
        <div className="list-stack">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="list-card certificate-list-card">
              <button type="button" className="certificate-list-card__body" onClick={() => onEdit(certificate)}>
                <div className="certificate-thumb-wrap">
                  <img src={certificate.imageUrl} alt={certificate.title} className="certificate-thumb" />
                </div>
                <div>
                  <strong>{certificate.title}</strong>
                  <span>
                    Sort {certificate.sortOrder || 0} • {certificate.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="danger-action"
                onClick={() => onDelete(certificate)}
                disabled={isDeleting === String(certificate.id)}
              >
                {isDeleting === String(certificate.id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

const defaultCurriculumSettings = {
  title: "12 Weeks to Kickstart Your Digital Marketing Journey",
  subtitle: "(Yes 12 weeks is all it will take)",
  description:
    "Step inside Digilligent and learn how a modern marketing agency operates. From client meetings and campaign planning to content production and performance marketing, you'll gain firsthand exposure to the people, processes, and projects that drive real business growth.",
  weeks: [
    {
      weekNumber: 1,
      tag: "ORIENTATION & FOUNDATIONS OF DIGITAL MARKETING",
      episodes: [
        {
          episodeNumber: 1,
          title: "The Digital Playfield",
          thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Importance of Social Media & Digital Marketing",
            "The Shift from Advertising to Storytelling",
            "Soft Skills for Digital Marketer",
            "Latest Trending Content Overview (Reels/Trends)",
            "The Marketing Funnel Model (TOFU, MOFU, BOFU)"
          ]
        },
        {
          episodeNumber: 2,
          title: "Agency Operations & Brief Breakdown",
          thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Deconstructing Client Briefs",
            "Cross-Functional Team Collaboration",
            "Content Strategy Frameworks",
            "Sprint Planning & Project Deadlines"
          ]
        }
      ]
    },
    {
      weekNumber: 2,
      tag: "BRAND STRATEGY & CUSTOMER AVATARS",
      episodes: [
        {
          episodeNumber: 1,
          title: "Customer Avatars & Positioning",
          thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
          bullets: [
            "Building Ideal Customer Profiles (ICPs)",
            "Competitor Benchmarking & Intelligence",
            "Value Proposition & Brand Positioning",
            "Brand Tone of Voice Guidelines"
          ]
        }
      ]
    }
  ]
};

function CurriculumView({ curriculumSettings, onSaveCurriculumSettings, isSavingCurriculum, curriculumFeedback }) {
  const [currDraft, setCurrDraft] = useState(curriculumSettings || defaultCurriculumSettings);
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(0);

  useEffect(() => {
    if (curriculumSettings) {
      setCurrDraft(curriculumSettings);
    }
  }, [curriculumSettings]);

  function handleCurrSubmit(e) {
    e.preventDefault();
    onSaveCurriculumSettings(currDraft);
  }

  function handleFileUpload(wIdx, epIdx, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      updateEpisodeField(wIdx, epIdx, "thumbnail", evt.target.result);
    };
    reader.readAsDataURL(file);
  }

  function addWeek() {
    setCurrDraft((prev) => {
      const nextNum = (prev.weeks?.length || 0) + 1;
      const newWeeks = [
        ...(prev.weeks || []),
        {
          weekNumber: nextNum,
          tag: `WEEK ${nextNum} MODULE`,
          episodes: [
            {
              episodeNumber: 1,
              title: "New Episode Title",
              thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
              bullets: ["Key Takeaway 1", "Key Takeaway 2"]
            }
          ]
        }
      ];
      setSelectedWeekIdx(newWeeks.length - 1);
      return { ...prev, weeks: newWeeks };
    });
  }

  function removeWeek(wIdx) {
    setCurrDraft((prev) => {
      const updated = (prev.weeks || []).filter((_, idx) => idx !== wIdx).map((w, idx) => ({ ...w, weekNumber: idx + 1 }));
      if (selectedWeekIdx >= updated.length) {
        setSelectedWeekIdx(Math.max(0, updated.length - 1));
      }
      return { ...prev, weeks: updated };
    });
  }

  function updateWeekTag(wIdx, newTag) {
    setCurrDraft((prev) => {
      const updated = [...(prev.weeks || [])];
      updated[wIdx] = { ...updated[wIdx], tag: newTag };
      return { ...prev, weeks: updated };
    });
  }

  function addEpisode(wIdx) {
    setCurrDraft((prev) => {
      const updatedWeeks = [...(prev.weeks || [])];
      const targetWeek = { ...updatedWeeks[wIdx] };
      const nextEpNum = (targetWeek.episodes?.length || 0) + 1;
      targetWeek.episodes = [
        ...(targetWeek.episodes || []),
        {
          episodeNumber: nextEpNum,
          title: "New Episode Title",
          thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
          bullets: ["Lesson Topic 1", "Lesson Topic 2"]
        }
      ];
      updatedWeeks[wIdx] = targetWeek;
      return { ...prev, weeks: updatedWeeks };
    });
  }

  function removeEpisode(wIdx, epIdx) {
    setCurrDraft((prev) => {
      const updatedWeeks = [...(prev.weeks || [])];
      const targetWeek = { ...updatedWeeks[wIdx] };
      targetWeek.episodes = (targetWeek.episodes || [])
        .filter((_, idx) => idx !== epIdx)
        .map((ep, idx) => ({ ...ep, episodeNumber: idx + 1 }));
      updatedWeeks[wIdx] = targetWeek;
      return { ...prev, weeks: updatedWeeks };
    });
  }

  function updateEpisodeField(wIdx, epIdx, field, val) {
    setCurrDraft((prev) => {
      const updatedWeeks = [...(prev.weeks || [])];
      const targetWeek = { ...updatedWeeks[wIdx] };
      const updatedEps = [...(targetWeek.episodes || [])];
      updatedEps[epIdx] = { ...updatedEps[epIdx], [field]: val };
      targetWeek.episodes = updatedEps;
      updatedWeeks[wIdx] = targetWeek;
      return { ...prev, weeks: updatedWeeks };
    });
  }

  const weeks = currDraft.weeks || [];
  const currentWeek = weeks[selectedWeekIdx] || weeks[0];
  const safeWeekIdx = Math.min(selectedWeekIdx, Math.max(0, weeks.length - 1));

  return (
    <article className="card" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <p className="eyebrow">COURSE MANAGEMENT</p>
      <h2>Landing Page Curriculum Manager</h2>
      <p className="field-note">
        Manage weeks, episodes, topics, and thumbnail images displayed in the interactive homepage carousel.
      </p>

      <form onSubmit={handleCurrSubmit} className="stack-form" style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {/* Section Metadata Header */}
        <div style={{ display: "grid", gap: "12px", background: "var(--card-sub-bg, rgba(255,255,255,0.03))", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color, #333)" }}>
          <label style={{ display: "grid", gap: "6px" }}>
            <strong>Section Title</strong>
            <input
              type="text"
              value={currDraft.title || ""}
              onChange={(e) => setCurrDraft((prev) => ({ ...prev, title: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            />
          </label>

          <label style={{ display: "grid", gap: "6px" }}>
            <strong>Section Subtitle</strong>
            <input
              type="text"
              value={currDraft.subtitle || ""}
              onChange={(e) => setCurrDraft((prev) => ({ ...prev, subtitle: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            />
          </label>

          <label style={{ display: "grid", gap: "6px" }}>
            <strong>Section Description</strong>
            <textarea
              rows={2}
              value={currDraft.description || ""}
              onChange={(e) => setCurrDraft((prev) => ({ ...prev, description: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            />
          </label>
        </div>

        {/* Week Selector Dropdown & Quick Navigation Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", background: "rgba(248, 156, 28, 0.06)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(248, 156, 28, 0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <strong style={{ fontSize: "1.05rem", color: "#f89c1c" }}>Select Week to Edit:</strong>
            <select
              value={safeWeekIdx}
              onChange={(e) => setSelectedWeekIdx(Number(e.target.value))}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: "var(--card-bg, #1a1a1a)",
                color: "var(--foreground, #ffffff)",
                border: "1.5px solid #f89c1c",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                outline: "none"
              }}
            >
              {weeks.map((w, idx) => (
                <option key={idx} value={idx}>
                  Week {w.weekNumber} - {w.tag || `Module ${w.weekNumber}`} ({w.episodes?.length || 0} Episodes)
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="ghost-button" onClick={addWeek} style={{ color: "#f89c1c", borderColor: "#f89c1c", fontWeight: "bold" }}>
            + Add New Week
          </button>
        </div>

        {/* Currently Selected Week Card */}
        {currentWeek && (
          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              border: "1px solid var(--border-color, #e2e8f0)",
              background: "rgba(255,255,255,0.02)",
              display: "grid",
              gap: "16px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.2rem", color: "#f89c1c" }}>Editing Week {currentWeek.weekNumber}</strong>
              {weeks.length > 1 && (
                <button
                  type="button"
                  style={{ color: "#ef4444", background: "none", border: "1px solid #ef4444", borderRadius: "6px", padding: "4px 12px", cursor: "pointer", fontSize: "0.85rem", fontWeight: "bold" }}
                  onClick={() => removeWeek(safeWeekIdx)}
                >
                  Delete Week {currentWeek.weekNumber}
                </button>
              )}
            </div>

            <label style={{ display: "grid", gap: "6px" }}>
              <span className="field-note" style={{ fontWeight: "bold" }}>Module Tag / Title</span>
              <input
                type="text"
                value={currentWeek.tag || ""}
                onChange={(e) => updateWeekTag(safeWeekIdx, e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            </label>

            {/* Episodes inside Active Week */}
            <div style={{ display: "grid", gap: "16px", paddingLeft: "14px", borderLeft: "4px solid #f89c1c" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.05rem", fontWeight: "bold" }}>Episodes ({currentWeek.episodes?.length || 0})</span>
                <button
                  type="button"
                  style={{ fontSize: "0.85rem", background: "#f89c1c", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => addEpisode(safeWeekIdx)}
                >
                  + Add Episode
                </button>
              </div>

              {(currentWeek.episodes || []).map((ep, epIdx) => (
                <div key={epIdx} style={{ display: "grid", gap: "14px", padding: "18px", borderRadius: "12px", background: "var(--card-bg, #ffffff)", border: "1px solid var(--border-color, #e2e8f0)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#f89c1c" }}>Episode {ep.episodeNumber || epIdx + 1}</span>
                    {(currentWeek.episodes || []).length > 1 && (
                      <button
                        type="button"
                        style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: "bold" }}
                        onClick={() => removeEpisode(safeWeekIdx, epIdx)}
                      >
                        Remove Episode
                      </button>
                    )}
                  </div>

                  <label style={{ display: "grid", gap: "4px" }}>
                    <span className="field-note">Episode Title</span>
                    <input
                      type="text"
                      placeholder="Episode Title"
                      value={ep.title || ""}
                      onChange={(e) => updateEpisodeField(safeWeekIdx, epIdx, "title", e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </label>

                  {/* Clean Image Upload & Live Preview */}
                  <div style={{ display: "grid", gap: "8px" }}>
                    <span className="field-note" style={{ fontWeight: "bold" }}>
                      Thumbnail Image <span style={{ fontWeight: "normal", color: "#666", fontSize: "0.85em", marginLeft: "6px" }}>(Recommended dimensions: 1200 x 800 pixels)</span>
                    </span>
                    
                    <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
                      {/* Live Image Preview Thumbnail */}
                      <div style={{ width: "110px", height: "65px", borderRadius: "8px", overflow: "hidden", background: "#000", border: "1px solid #444", flexShrink: 0 }}>
                        <img
                          src={ep.thumbnail || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
                          alt="Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: "240px", display: "grid", gap: "8px" }}>
                        {/* File Upload Button */}
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <label className="secondary-button" style={{ cursor: "pointer", padding: "8px 14px", fontSize: "0.88rem", margin: 0, fontWeight: "bold" }}>
                            📁 Upload Image File
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => handleFileUpload(safeWeekIdx, epIdx, e.target.files[0])}
                            />
                          </label>
                        </div>

                        {/* Direct Image URL Input */}
                        <input
                          type="text"
                          placeholder="Or enter image URL (https://...)"
                          value={ep.thumbnail || ""}
                          onChange={(e) => updateEpisodeField(safeWeekIdx, epIdx, "thumbnail", e.target.value)}
                          style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>
                  </div>

                  <label style={{ display: "grid", gap: "4px" }}>
                    <span className="field-note">Topics / Bullet Points (One per line)</span>
                    <textarea
                      rows={3}
                      placeholder="Topics (One per line)"
                      value={Array.isArray(ep.bullets) ? ep.bullets.join("\n") : ep.bullets || ""}
                      onChange={(e) => updateEpisodeField(safeWeekIdx, epIdx, "bullets", e.target.value.split("\n"))}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {curriculumFeedback ? <p className={curriculumFeedback.ok ? "form-feedback" : "form-feedback error"}>{curriculumFeedback.message}</p> : null}

        <div className="form-actions" style={{ marginTop: "16px" }}>
          <button type="submit" className="primary-button" disabled={isSavingCurriculum} style={{ padding: "12px 28px", fontSize: "1rem" }}>
            {isSavingCurriculum ? "Saving Curriculum..." : "Save Curriculum Changes"}
          </button>
        </div>
      </form>
    </article>
  );
}

function SettingsView({
  footerSettings,
  onSaveFooterSettings,
  isSavingFooter,
  footerFeedback,
  onUpdatePassword
}) {
  const [footerDraft, setFooterDraft] = useState(footerSettings || { instagramUrl: "", facebookUrl: "", linkedinUrl: "" });
  const [passwordDraft, setPasswordDraft] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (footerSettings) {
      setFooterDraft(footerSettings);
    }
  }, [footerSettings]);

  function handleFooterSubmit(e) {
    e.preventDefault();
    onSaveFooterSettings(footerDraft);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordFeedback(null);
    setIsUpdatingPassword(true);
    
    const result = await onUpdatePassword(passwordDraft);
    if (result.ok) {
      setPasswordFeedback({ ok: true, message: "Password updated successfully!" });
      setPasswordDraft("");
    } else {
      setPasswordFeedback({ ok: false, message: result.error || "Failed to update password." });
    }
    setIsUpdatingPassword(false);
  }

  return (
    <section className="view-grid" style={{ display: "grid", gap: "24px" }}>
      {/* Footer Social Settings */}
      <article className="card">
        <p className="eyebrow">Website Settings</p>
        <h2>Footer Social Media Links</h2>
        <p className="field-note">
          Configure the social media URLs for the footer.
        </p>

        <form onSubmit={handleFooterSubmit} className="stack-form" style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
          <label style={{ display: "grid", gap: "6px" }}>
            <strong>Instagram URL</strong>
            <input
              type="text"
              placeholder="https://instagram.com/..."
              value={footerDraft.instagramUrl || ""}
              onChange={(e) => setFooterDraft((current) => ({ ...current, instagramUrl: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            />
          </label>
          <label style={{ display: "grid", gap: "6px" }}>
            <strong>Facebook URL</strong>
            <input
              type="text"
              placeholder="https://facebook.com/..."
              value={footerDraft.facebookUrl || ""}
              onChange={(e) => setFooterDraft((current) => ({ ...current, facebookUrl: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            />
          </label>
          <label style={{ display: "grid", gap: "6px" }}>
            <strong>LinkedIn URL</strong>
            <input
              type="text"
              placeholder="https://linkedin.com/..."
              value={footerDraft.linkedinUrl || ""}
              onChange={(e) => setFooterDraft((current) => ({ ...current, linkedinUrl: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            />
          </label>

          {footerFeedback ? <p className={footerFeedback.ok ? "form-feedback" : "form-feedback error"}>{footerFeedback.message}</p> : null}

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={isSavingFooter}>
              {isSavingFooter ? "Saving..." : "Save Social Links"}
            </button>
          </div>
        </form>
      </article>

      {/* Admin Password Change */}
      <article className="card">
        <p className="eyebrow">Admin Account</p>
        <h2>Change Password</h2>
        <p className="field-note">
          Update your admin dashboard password.
        </p>

        <form onSubmit={handlePasswordSubmit} className="stack-form" style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
          <label style={{ display: "grid", gap: "6px" }}>
            <strong>New Password</strong>
            <input
              type="password"
              placeholder="Enter new password (min 6 chars)"
              value={passwordDraft}
              onChange={(e) => setPasswordDraft(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
              required
              minLength={6}
            />
          </label>

          {passwordFeedback ? <p className={passwordFeedback.ok ? "form-feedback" : "form-feedback error"}>{passwordFeedback.message}</p> : null}

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={isUpdatingPassword || !passwordDraft || passwordDraft.length < 6}>
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

const defaultPackageSettings = {
  title: "What will these 6 Months Cost?",
  packages: [
    {
      id: "founders-plan",
      badge: "Founder's Advantage Plan",
      subtitle: "Best Value - One Time Payment",
      originalPrice: "₹ 82,515*",
      taxNote: "+ 18% GST",
      highlightBannerTitle: "Exclusive Benefits for the Founding Cohort",
      highlightBannerText: "Save more with Founder Scholarship and Upfront Payment Benefits.",
      feeBreakdown: [
        { label: "Professional Certification Program", amount: "₹82,515", isDiscount: false },
        { label: "Founder's Scholarship", amount: "- ₹12,515", isDiscount: true },
        { label: "Upfront Payment Benefit", amount: "- ₹5,000", isDiscount: false }
      ],
      totalEffectiveFee: "₹65,000*",
      totalPayable: "₹65,000*",
      totalPayableNote: "Inclusive of 18% GST",
      ctaText: "APPLY NOW --->"
    },
    {
      id: "flexible-plan",
      badge: "Flexible Learning Plan",
      subtitle: "3-Phase Payment",
      originalPrice: "₹ 82,515*",
      taxNote: "+ 18% GST",
      highlightBannerTitle: "Flexible Payments. Same Learning Experience.",
      highlightBannerText: "Spread your payments across three phases without missing out on the complete DigiNext journey.",
      feeBreakdown: [
        { label: "Professional Certification Program", amount: "₹82,515", isDiscount: false },
        { label: "Founder's Scholarship", amount: "- ₹10,515", isDiscount: true },
        { label: "Upfront Payment Benefit", amount: "- ₹5,000", isDiscount: false },
        { label: "EMI Processing Fees", amount: "- ₹2,000", isDiscount: false }
      ],
      totalEffectiveFee: "₹74,000*",
      totalPayable: "₹74,000*",
      totalPayableNote: "Inclusive of 18% GST",
      ctaText: "APPLY NOW --->"
    }
  ]
};

function PackagesView({ packageSettings, onSavePackageSettings, isSavingPackage, packageFeedback }) {
  const [pkgDraft, setPkgDraft] = useState(packageSettings || defaultPackageSettings);
  const [selectedPkgIdx, setSelectedPkgIdx] = useState(0);

  useEffect(() => {
    if (packageSettings) {
      setPkgDraft(packageSettings);
    }
  }, [packageSettings]);

  function handlePkgSubmit(e) {
    e.preventDefault();
    onSavePackageSettings(pkgDraft);
  }

  const packages = Array.isArray(pkgDraft.packages) && pkgDraft.packages.length > 0
    ? pkgDraft.packages
    : defaultPackageSettings.packages;
  const currentPkg = packages[selectedPkgIdx] || packages[0] || {};

  function handleAddPackage() {
    const newIdx = packages.length;
    const newPkg = {
      id: `package-${Date.now()}`,
      badge: `New Package Plan ${newIdx + 1}`,
      subtitle: "Custom Payment Option",
      originalPrice: "₹ 82,515*",
      taxNote: "+ 18% GST",
      highlightBannerTitle: "Special Cohort Offer",
      highlightBannerText: "Save with our special introductory scholarship benefit.",
      feeBreakdown: [
        { label: "Professional Certification Program", amount: "₹82,515", isDiscount: false },
        { label: "Special Discount", amount: "- ₹10,000", isDiscount: true }
      ],
      totalEffectiveFee: "₹72,515*",
      totalPayable: "₹72,515*",
      totalPayableNote: "Inclusive of 18% GST",
      ctaText: "APPLY NOW --->"
    };

    setPkgDraft((prev) => {
      const cur = Array.isArray(prev.packages) ? prev.packages : defaultPackageSettings.packages;
      return { ...prev, packages: [...cur, newPkg] };
    });
    setSelectedPkgIdx(newIdx);
  }

  function handleDeletePackage(indexToDelete) {
    if (packages.length <= 1) {
      alert("At least one package plan must remain active on the platform.");
      return;
    }

    const pkgName = packages[indexToDelete]?.badge || `Package ${indexToDelete + 1}`;
    if (!window.confirm(`Are you sure you want to delete "${pkgName}"?`)) {
      return;
    }

    setPkgDraft((prev) => {
      const cur = Array.isArray(prev.packages) ? prev.packages : defaultPackageSettings.packages;
      const filtered = cur.filter((_, idx) => idx !== indexToDelete);
      return { ...prev, packages: filtered };
    });

    if (selectedPkgIdx >= packages.length - 1) {
      setSelectedPkgIdx(Math.max(0, packages.length - 2));
    }
  }

  function updatePkgField(field, value) {
    setPkgDraft((prev) => {
      const nextPkgs = [...(prev.packages || [])];
      nextPkgs[selectedPkgIdx] = {
        ...nextPkgs[selectedPkgIdx],
        [field]: value
      };
      return { ...prev, packages: nextPkgs };
    });
  }

  function computeAutoTotal(pkg) {
    if (!pkg) return "₹0*";
    let total = 0;
    if (Array.isArray(pkg.feeBreakdown) && pkg.feeBreakdown.length > 0) {
      pkg.feeBreakdown.forEach((item) => {
        if (!item || !item.amount) return;
        const str = String(item.amount);
        const cleanDigits = str.replace(/[^0-9]/g, "");
        const val = parseInt(cleanDigits, 10);
        if (!isNaN(val)) {
          const isNegative = str.includes("-") || Boolean(item.isDiscount);
          total += isNegative ? -val : val;
        }
      });
    } else if (pkg.originalPrice) {
      const cleanDigits = String(pkg.originalPrice).replace(/[^0-9]/g, "");
      total = parseInt(cleanDigits, 10) || 0;
    }
    return total > 0 ? `₹${total.toLocaleString("en-IN")}*` : "₹0*";
  }

  function updateBreakdownItem(itemIdx, field, value) {
    setPkgDraft((prev) => {
      const nextPkgs = [...(prev.packages || [])];
      const curPkg = { ...nextPkgs[selectedPkgIdx] };
      const curBreakdown = [...(curPkg.feeBreakdown || [])];
      curBreakdown[itemIdx] = {
        ...curBreakdown[itemIdx],
        [field]: value
      };
      curPkg.feeBreakdown = curBreakdown;
      const autoTotal = computeAutoTotal(curPkg);
      curPkg.totalEffectiveFee = autoTotal;
      curPkg.totalPayable = autoTotal;
      nextPkgs[selectedPkgIdx] = curPkg;
      return { ...prev, packages: nextPkgs };
    });
  }

  function addBreakdownItem() {
    setPkgDraft((prev) => {
      const nextPkgs = [...(prev.packages || [])];
      const curPkg = { ...nextPkgs[selectedPkgIdx] };
      const curBreakdown = [...(curPkg.feeBreakdown || [])];
      curBreakdown.push({ label: "Special Discount", amount: "- ₹1,000", isDiscount: true });
      curPkg.feeBreakdown = curBreakdown;
      const autoTotal = computeAutoTotal(curPkg);
      curPkg.totalEffectiveFee = autoTotal;
      curPkg.totalPayable = autoTotal;
      nextPkgs[selectedPkgIdx] = curPkg;
      return { ...prev, packages: nextPkgs };
    });
  }

  function removeBreakdownItem(itemIdx) {
    setPkgDraft((prev) => {
      const nextPkgs = [...(prev.packages || [])];
      const curPkg = { ...nextPkgs[selectedPkgIdx] };
      const curBreakdown = (curPkg.feeBreakdown || []).filter((_, idx) => idx !== itemIdx);
      curPkg.feeBreakdown = curBreakdown;
      const autoTotal = computeAutoTotal(curPkg);
      curPkg.totalEffectiveFee = autoTotal;
      curPkg.totalPayable = autoTotal;
      nextPkgs[selectedPkgIdx] = curPkg;
      return { ...prev, packages: nextPkgs };
    });
  }

  function handleAutoCalculate() {
    const autoTotal = computeAutoTotal(currentPkg);
    setPkgDraft((prev) => {
      const nextPkgs = [...(prev.packages || [])];
      nextPkgs[selectedPkgIdx] = {
        ...nextPkgs[selectedPkgIdx],
        totalEffectiveFee: autoTotal,
        totalPayable: autoTotal
      };
      return { ...prev, packages: nextPkgs };
    });
  }

  return (
    <article className="card" style={{ maxWidth: "1050px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <p className="eyebrow">Pricing & Fee Management</p>
          <h2 style={{ margin: 0 }}>Package & Pricing Plans</h2>
        </div>
        <button
          type="button"
          onClick={handleAddPackage}
          style={{
            background: "linear-gradient(90deg, #f89c1c 0%, #fbaf33 100%)",
            color: "#000",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "800",
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(248, 156, 28, 0.25)"
          }}
        >
          <span>＋</span> Add New Package
        </button>
      </div>

      <form onSubmit={handlePkgSubmit} style={{ display: "grid", gap: "24px" }}>
        {/* Section Main Title */}
        <label style={{ display: "grid", gap: "6px" }}>
          <strong>Main Section Title (Web Page)</strong>
          <input
            type="text"
            value={pkgDraft.title || ""}
            onChange={(e) => setPkgDraft((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. What will these 6 Months Cost?"
            style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
          />
        </label>

        {/* Quick Tabs / Pills for Packages */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <strong style={{ color: "#f89c1c", fontSize: "0.88rem", marginRight: "4px" }}>All Plans ({packages.length}):</strong>
          {packages.map((pkg, idx) => {
            const isSelected = selectedPkgIdx === idx;
            return (
              <div
                key={pkg.id || idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: isSelected ? "rgba(248, 156, 28, 0.14)" : "var(--input-bg, rgba(0, 0, 0, 0.05))",
                  border: isSelected ? "1.5px solid #f89c1c" : "1px solid var(--border-color, rgba(0, 0, 0, 0.15))",
                  borderRadius: "99px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => setSelectedPkgIdx(idx)}
              >
                <span style={{ fontSize: "0.84rem", fontWeight: isSelected ? "800" : "600", color: isSelected ? "#e08307" : "var(--foreground, #333333)" }}>
                  {idx + 1}. {pkg.badge || `Package ${idx + 1}`}
                </span>
                {packages.length > 1 && (
                  <button
                    type="button"
                    title="Delete package"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePackage(idx);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: isSelected ? "#e08307" : "var(--muted-text, #888)",
                      cursor: "pointer",
                      fontSize: "1rem",
                      lineHeight: 1,
                      padding: "0 2px"
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Package Details Box */}
        {currentPkg && (
          <div style={{ display: "grid", gap: "20px", background: "rgba(255, 255, 255, 0.02)", padding: "24px", borderRadius: "14px", border: "1px solid var(--border-color, #333)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, color: "#f89c1c", fontSize: "1.1rem" }}>
                Editing Package {selectedPkgIdx + 1}: {currentPkg.badge}
              </h3>
              {packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeletePackage(selectedPkgIdx)}
                  style={{
                    background: "rgba(255, 77, 77, 0.1)",
                    border: "1px solid rgba(255, 77, 77, 0.3)",
                    color: "#ff6b6b",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontWeight: "700",
                    fontSize: "0.82rem",
                    cursor: "pointer"
                  }}
                >
                  🗑 Delete This Package
                </button>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <label style={{ display: "grid", gap: "6px" }}>
                <strong>Plan Badge Name</strong>
                <input
                  type="text"
                  value={currentPkg.badge || ""}
                  onChange={(e) => updatePkgField("badge", e.target.value)}
                  placeholder="e.g. Founder's Advantage Plan"
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </label>

              <label style={{ display: "grid", gap: "6px" }}>
                <strong>Plan Subtitle / Mode</strong>
                <input
                  type="text"
                  value={currentPkg.subtitle || ""}
                  onChange={(e) => updatePkgField("subtitle", e.target.value)}
                  placeholder="e.g. Best Value - One Time Payment"
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <label style={{ display: "grid", gap: "6px" }}>
                <strong>Base Price Display</strong>
                <input
                  type="text"
                  value={currentPkg.originalPrice || ""}
                  onChange={(e) => updatePkgField("originalPrice", e.target.value)}
                  placeholder="e.g. ₹ 82,515*"
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </label>

              <label style={{ display: "grid", gap: "6px" }}>
                <strong>Tax / Fee Note</strong>
                <input
                  type="text"
                  value={currentPkg.taxNote || ""}
                  onChange={(e) => updatePkgField("taxNote", e.target.value)}
                  placeholder="e.g. + 18% GST"
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </label>
            </div>

            {/* Highlight Banner */}
            <div style={{ display: "grid", gap: "12px", border: "1px dashed rgba(248, 156, 28, 0.4)", padding: "16px", borderRadius: "10px" }}>
              <strong style={{ color: "#f89c1c" }}>Highlight Banner Box</strong>
              <label style={{ display: "grid", gap: "6px" }}>
                <span>Banner Title</span>
                <input
                  type="text"
                  value={currentPkg.highlightBannerTitle || ""}
                  onChange={(e) => updatePkgField("highlightBannerTitle", e.target.value)}
                  placeholder="e.g. Exclusive Benefits for the Founding Cohort"
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </label>
              <label style={{ display: "grid", gap: "6px" }}>
                <span>Banner Description</span>
                <input
                  type="text"
                  value={currentPkg.highlightBannerText || ""}
                  onChange={(e) => updatePkgField("highlightBannerText", e.target.value)}
                  placeholder="e.g. Save more with Founder Scholarship..."
                  style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </label>
            </div>

            {/* Fee Breakdown Editor */}
            <div style={{ display: "grid", gap: "12px", border: "1px solid rgba(255,255,255,0.1)", padding: "16px", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ color: "#f89c1c" }}>Fee Breakdown Items</strong>
                <button type="button" onClick={addBreakdownItem} style={{ padding: "6px 12px", fontSize: "0.85rem", cursor: "pointer" }}>
                  + Add Fee Item / Discount
                </button>
              </div>

              {(currentPkg.feeBreakdown || []).map((item, fIdx) => (
                <div key={fIdx} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateBreakdownItem(fIdx, "label", e.target.value)}
                    placeholder="Item Label (e.g. Founder's Scholarship)"
                    style={{ flex: 1, padding: "6px 10px", borderRadius: "4px" }}
                  />
                  <input
                    type="text"
                    value={item.amount}
                    onChange={(e) => updateBreakdownItem(fIdx, "amount", e.target.value)}
                    placeholder="Amount (e.g. - ₹12,515)"
                    style={{ width: "140px", padding: "6px 10px", borderRadius: "4px" }}
                  />
                  <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={Boolean(item.isDiscount)}
                      onChange={(e) => updateBreakdownItem(fIdx, "isDiscount", e.target.checked)}
                    />
                    Discount (Orange)
                  </label>
                  <button type="button" onClick={() => removeBreakdownItem(fIdx)} style={{ color: "#ff4d4d", background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}>
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Total Payable & CTA */}
            <div style={{ display: "grid", gap: "12px", border: "1px solid rgba(248, 156, 28, 0.25)", padding: "16px", borderRadius: "10px", background: "rgba(248, 156, 28, 0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ color: "#f89c1c", fontSize: "0.95rem" }}>Total Payable & Button CTA</strong>
                <button
                  type="button"
                  onClick={handleAutoCalculate}
                  style={{
                    background: "rgba(248, 156, 28, 0.12)",
                    border: "1px solid #f89c1c",
                    color: "#e08307",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontWeight: "700",
                    fontSize: "0.82rem",
                    cursor: "pointer"
                  }}
                >
                  ⚡ Auto-Calculate Totals ({computeAutoTotal(currentPkg)})
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <label style={{ display: "grid", gap: "6px" }}>
                  <strong>Total Effective Fee</strong>
                  <input
                    type="text"
                    value={currentPkg.totalEffectiveFee || ""}
                    onChange={(e) => updatePkgField("totalEffectiveFee", e.target.value)}
                    placeholder="e.g. ₹65,000*"
                    style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </label>

                <label style={{ display: "grid", gap: "6px" }}>
                  <strong>Total Payable Display</strong>
                  <input
                    type="text"
                    value={currentPkg.totalPayable || ""}
                    onChange={(e) => updatePkgField("totalPayable", e.target.value)}
                    placeholder="e.g. ₹65,000*"
                    style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </label>

                <label style={{ display: "grid", gap: "6px" }}>
                  <strong>Button CTA Text</strong>
                  <input
                    type="text"
                    value={currentPkg.ctaText || ""}
                    onChange={(e) => updatePkgField("ctaText", e.target.value)}
                    placeholder="e.g. APPLY NOW --->"
                    style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {packageFeedback ? <p className={packageFeedback.ok ? "form-feedback" : "form-feedback error"}>{packageFeedback.message}</p> : null}

        <div className="form-actions" style={{ marginTop: "16px" }}>
          <button type="submit" className="primary-button" disabled={isSavingPackage} style={{ padding: "12px 28px", fontSize: "1rem" }}>
            {isSavingPackage ? "Saving Package Settings..." : "Save All Package Settings"}
          </button>
        </div>
      </form>
    </article>
  );
}

const defaultFaqSettings = {
  sectionTitle: "Frequently Asked Questions",
  faqs: [
    {
      question: "How do I enroll?",
      answer: "Use Enquire Now or Download Curriculum on the website to get started."
    },
    {
      question: "Is this course offline?",
      answer: "Yes. The course is offered from Mumbai."
    },
    {
      question: "Will I work on projects?",
      answer: "Yes. DigiNext uses hands-on, project-led learning."
    },
    {
      question: "Will I receive guidance?",
      answer: "Yes. Training includes expert support and mentor feedback."
    }
  ]
};

function FaqAdminView({ faqSettings, onSaveFaqSettings, isSavingFaq, faqFeedback }) {
  const [faqDraft, setFaqDraft] = useState(faqSettings || defaultFaqSettings);

  useEffect(() => {
    if (faqSettings) {
      setFaqDraft(faqSettings);
    }
  }, [faqSettings]);

  function handleSubmit(e) {
    e.preventDefault();
    onSaveFaqSettings(faqDraft);
  }

  function updateField(field, value) {
    setFaqDraft((prev) => ({ ...prev, [field]: value }));
  }

  function updateFaqItem(index, key, value) {
    setFaqDraft((prev) => {
      const curFaqs = Array.isArray(prev.faqs) ? [...prev.faqs] : [];
      curFaqs[index] = { ...curFaqs[index], [key]: value };
      return { ...prev, faqs: curFaqs };
    });
  }

  function addFaqItem() {
    setFaqDraft((prev) => {
      const curFaqs = Array.isArray(prev.faqs) ? [...prev.faqs] : [];
      return {
        ...prev,
        faqs: [
          ...curFaqs,
          { question: "", answer: "" }
        ]
      };
    });
  }

  function removeFaqItem(indexToRemove) {
    if (faqDraft.faqs.length <= 1) {
      alert("At least one FAQ item must be kept.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this FAQ question?")) {
      return;
    }
    setFaqDraft((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, idx) => idx !== indexToRemove)
    }));
  }

  function moveFaqItem(index, direction) {
    const newFaqs = [...faqDraft.faqs];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[targetIndex];
    newFaqs[targetIndex] = temp;
    setFaqDraft((prev) => ({ ...prev, faqs: newFaqs }));
  }

  return (
    <article className="card" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <p className="eyebrow">Website Section Management</p>
      <h2>Manage Frequently Asked Questions (FAQ)</h2>
      <p className="field-note">
        Create, edit, reorder, or remove FAQ questions displayed on the DigiNext main website.
      </p>

      <form onSubmit={handleSubmit} className="stack-form" style={{ display: "grid", gap: "24px", marginTop: "20px" }}>
        {/* Section Header Settings */}
        <label style={{ display: "grid", gap: "6px" }}>
          <strong>Section Title</strong>
          <input
            type="text"
            value={faqDraft.sectionTitle || ""}
            onChange={(e) => updateField("sectionTitle", e.target.value)}
            placeholder="e.g. Frequently Asked Questions"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color, #ccc)" }}
            required
          />
        </label>

        {/* FAQs List */}
        <div style={{ display: "grid", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: "1.1rem", color: "#f89c1c" }}>FAQ Questions & Answers ({faqDraft.faqs?.length || 0})</strong>
            <button
              type="button"
              onClick={addFaqItem}
              style={{
                background: "#f89c1c",
                color: "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              + Add New Question
            </button>
          </div>

          {(faqDraft.faqs || []).map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
                padding: "16px",
                display: "grid",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "700", color: "#f89c1c", fontSize: "0.9rem" }}>Question #{idx + 1}</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => moveFaqItem(idx, -1)}
                    disabled={idx === 0}
                    style={{ padding: "2px 8px", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1 }}
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveFaqItem(idx, 1)}
                    disabled={idx === (faqDraft.faqs.length - 1)}
                    style={{ padding: "2px 8px", cursor: idx === (faqDraft.faqs.length - 1) ? "not-allowed" : "pointer", opacity: idx === (faqDraft.faqs.length - 1) ? 0.3 : 1 }}
                    title="Move Down"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFaqItem(idx)}
                    style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "4px", fontSize: "0.8rem", cursor: "pointer", marginLeft: "8px" }}
                  >
                    Delete FAQ
                  </button>
                </div>
              </div>

              <label style={{ display: "grid", gap: "4px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Question</span>
                <input
                  type="text"
                  value={faq.question || ""}
                  onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                  placeholder="e.g. How do I enroll in this course?"
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border-color, #ccc)" }}
                  required
                />
              </label>

              <label style={{ display: "grid", gap: "4px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Answer</span>
                <textarea
                  value={faq.answer || ""}
                  onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                  placeholder="Enter detailed answer here..."
                  rows={3}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border-color, #ccc)", fontFamily: "inherit" }}
                  required
                />
              </label>
            </div>
          ))}
        </div>

        {faqFeedback ? <p className={faqFeedback.ok ? "form-feedback" : "form-feedback error"}>{faqFeedback.message}</p> : null}

        <div className="form-actions">
          <button type="submit" className="primary-button" disabled={isSavingFaq} style={{ padding: "12px 28px", fontSize: "1rem" }}>
            {isSavingFaq ? "Saving FAQ Settings..." : "Save All FAQ Settings"}
          </button>
        </div>
      </form>
    </article>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(null);
  const [booting, setBooting] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [leads, setLeads] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courseDraft, setCourseDraft] = useState(createEmptyCourse());
  const [courseBrochureFile, setCourseBrochureFile] = useState(null);
  const [courseFeedback, setCourseFeedback] = useState(null);
  const [certificateDraft, setCertificateDraft] = useState(createEmptyCertificate());
  const [certificateImageFile, setCertificateImageFile] = useState(null);
  const [certificateFeedback, setCertificateFeedback] = useState(null);
  const [teacherDraft, setTeacherDraft] = useState(createEmptyTeacher());
  const [teacherImageFile, setTeacherImageFile] = useState(null);
  const [teacherFeedback, setTeacherFeedback] = useState(null);
  const [videoSettings, setVideoSettings] = useState({
    youtubeUrl: "",
    title: "Experience Agency-Led Training at DigiNext",
    subtitle: "Watch how our students build real-world marketing campaigns inside a live agency environment."
  });
  const [footerSettings, setFooterSettings] = useState({
    instagramUrl: "",
    facebookUrl: "",
    linkedinUrl: ""
  });
  const [curriculumSettings, setCurriculumSettings] = useState(defaultCurriculumSettings);
  const [packageSettings, setPackageSettings] = useState(defaultPackageSettings);
  const [faqSettings, setFaqSettings] = useState(defaultFaqSettings);
  const [settingsFeedback, setSettingsFeedback] = useState(null);
  const [footerFeedback, setFooterFeedback] = useState(null);
  const [curriculumFeedback, setCurriculumFeedback] = useState(null);
  const [packageFeedback, setPackageFeedback] = useState(null);
  const [faqFeedback, setFaqFeedback] = useState(null);
  const [savingKey, setSavingKey] = useState("");

  async function loadAdminData(activeToken) {
    const [dashboardResult, citiesResult, coursesResult, certificatesResult, teachersResult, leadsResult, settingsResult] = await Promise.all([
      request("/dashboard", { token: activeToken }),
      request("/cities"),
      request("/courses", { token: activeToken }),
      request("/certificates/admin/all", { token: activeToken }),
      request("/teachers?includeHidden=true", { token: activeToken }),
      request("/leads", { token: activeToken }),
      request("/settings")
    ]);

    if (dashboardResult.ok) {
      setDashboard(dashboardResult.data);
    }

    if (citiesResult.ok) {
      setCities(citiesResult.data || []);
    }

    if (coursesResult.ok) {
      setCourses(coursesResult.data || []);
    }

    if (certificatesResult.ok) {
      setCertificates(certificatesResult.data || []);
    }

    if (teachersResult.ok) {
      setTeachers(teachersResult.data || []);
    }

    if (leadsResult.ok) {
      setLeads(leadsResult.data || []);
    }

    if (settingsResult.ok && Array.isArray(settingsResult.data)) {
      const map = settingsResult.data.reduce((acc, curr) => {
        acc[curr.key] = curr.valueJson;
        return acc;
      }, {});
      if (map.video_settings) {
        setVideoSettings((current) => ({ ...current, ...map.video_settings }));
      }
      if (map.footer_settings) {
        setFooterSettings((current) => ({ ...current, ...map.footer_settings }));
      }
      if (map.curriculum_settings) {
        setCurriculumSettings(map.curriculum_settings);
      }
      if (map.package_settings) {
        setPackageSettings(map.package_settings);
      }
      if (map.faq_settings) {
        setFaqSettings(map.faq_settings);
      }
    }
  }

  async function saveFaqSettings(payload) {
    setSavingKey("faq_settings");
    setFaqFeedback(null);

    const result = await request("/settings", {
      method: "PUT",
      token,
      body: {
        key: "faq_settings",
        valueJson: payload
      }
    });

    setSavingKey("");
    if (result.ok) {
      setFaqSettings(payload);
      setFaqFeedback({ ok: true, message: "FAQ settings updated successfully!" });
    } else {
      setFaqFeedback({ ok: false, message: result.error || "Failed to update FAQ settings" });
    }
  }

  async function savePackageSettings(payload) {
    setSavingKey("package_settings");
    setPackageFeedback(null);

    const result = await request("/settings", {
      method: "PUT",
      token,
      body: {
        key: "package_settings",
        valueJson: payload
      }
    });

    setSavingKey("");
    if (result.ok) {
      setPackageSettings(payload);
      setPackageFeedback({ ok: true, message: "Package & Pricing settings updated successfully!" });
    } else {
      setPackageFeedback({ ok: false, message: result.error || "Failed to update package settings" });
    }
  }

  async function saveVideoSettings(payload) {
    setSavingKey("video_settings");
    setSettingsFeedback(null);

    const result = await request("/settings", {
      method: "PUT",
      token,
      body: {
        key: "video_settings",
        valueJson: payload
      }
    });

    setSavingKey("");
    if (result.ok) {
      setVideoSettings(payload);
      setSettingsFeedback({ ok: true, message: "Video settings updated successfully!" });
    } else {
      setSettingsFeedback({ ok: false, message: result.error || "Failed to update video settings" });
    }
  }

  async function saveFooterSettings(payload) {
    setSavingKey("footer_settings");
    setFooterFeedback(null);

    const result = await request("/settings", {
      method: "PUT",
      token,
      body: {
        key: "footer_settings",
        valueJson: payload
      }
    });

    setSavingKey("");
    if (result.ok) {
      setFooterSettings(payload);
      setFooterFeedback({ ok: true, message: "Footer links updated successfully!" });
    } else {
      setFooterFeedback({ ok: false, message: result.error || "Failed to update footer settings" });
    }
  }

  async function updatePassword(newPassword) {
    const result = await request("/auth/password", {
      method: "PUT",
      token,
      body: { newPassword }
    });
    return result;
  }


  async function saveCurriculumSettings(payload) {
    setSavingKey("curriculum_settings");
    setCurriculumFeedback(null);

    const result = await request("/settings", {
      method: "PUT",
      token,
      body: {
        key: "curriculum_settings",
        valueJson: payload
      }
    });

    setSavingKey("");
    if (result.ok) {
      setCurriculumSettings(payload);
      setCurriculumFeedback({ ok: true, message: "Curriculum settings updated successfully!" });
    } else {
      setCurriculumFeedback({ ok: false, message: result.error || "Failed to update curriculum settings" });
    }
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!storedToken) {
      setBooting(false);
      return;
    }

    request("/auth/me", { token: storedToken }).then((result) => {
      if (result.ok) {
        setToken(storedToken);
        setAdmin(result.data);
      } else {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      }

      setBooting(false);
    });
  }, []);

  useEffect(() => {
    if (!token || !admin) {
      return;
    }

    loadAdminData(token);
  }, [token, admin]);

  const mumbaiCityId = useMemo(() => String(cities[0]?.id || ""), [cities]);

  async function handleLogin(credentials) {
    setAuthLoading(true);
    setAuthError("");
    const result = await request("/auth/login", { method: "POST", body: credentials });

    if (!result.ok) {
      setAuthError(result.error);
      setAuthLoading(false);
      return;
    }

    window.localStorage.setItem(TOKEN_STORAGE_KEY, result.data.token);
    setToken(result.data.token);
    setAdmin(result.data.admin);
    setAuthLoading(false);
  }

  function handleLogout() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken("");
    setAdmin(null);
    setDashboard(null);
    setCertificates([]);
    setTeachers([]);
    setLeads([]);
  }

  async function submitCourse(event) {
    event.preventDefault();
    setSavingKey("course");
    setCourseFeedback(null);

    let brochureUrl = courseDraft.brochureUrl;

    if (courseBrochureFile) {
      const uploadResult = await uploadBrochure(token, courseBrochureFile);

      if (!uploadResult.ok) {
        setCourseFeedback({ type: "error", message: uploadResult.error });
        setSavingKey("");
        return;
      }

      brochureUrl = uploadResult.data.absoluteUrl || uploadResult.data.url;
    }

    const payload = {
      cityId: mumbaiCityId,
      title: courseDraft.title,
      slug: courseDraft.slug,
      shortDescription: courseDraft.shortDescription,
      durationText: courseDraft.durationText,
      deliveryMode: courseDraft.deliveryMode,
      brochureUrl,
      sortOrder: courseDraft.sortOrder,
      isFeatured: courseDraft.isFeatured,
      status: courseDraft.status,
      faqs: (courseDraft.faqs || [])
        .map((faq) => ({
          question: faq.question.trim(),
          answer: faq.answer.trim()
        }))
        .filter((faq) => faq.question && faq.answer)
    };

    const result = await request(courseDraft.id ? `/courses/${courseDraft.id}` : "/courses", {
      method: courseDraft.id ? "PUT" : "POST",
      token,
      body: payload
    });

    if (result.ok) {
      setCourseFeedback({ type: "success", message: "Course saved." });
      setCourseDraft(createEmptyCourse());
      setCourseBrochureFile(null);
      await loadAdminData(token);
    } else {
      setCourseFeedback({ type: "error", message: result.error });
    }

    setSavingKey("");
  }

  function editCourse(course) {
    setActiveView("Courses");
    setCourseDraft({
      id: String(course.id),
      title: course.title || "",
      slug: course.slug || "",
      shortDescription: course.shortDescription || "",
      durationText: course.durationText || "",
      deliveryMode: course.deliveryMode || "",
      brochureUrl: course.brochureUrl || "",
      brochureName: "",
      sortOrder: Number(course.sortOrder || 0),
      isFeatured: Boolean(course.isFeatured),
      status: course.status || "DRAFT",
      faqs: Array.isArray(course.faqs)
        ? course.faqs.map((faq) => ({
          question: faq.question || "",
          answer: faq.answer || ""
        }))
        : []
    });
  }

  async function submitCertificate(event) {
    event.preventDefault();
    setSavingKey("certificate");
    setCertificateFeedback(null);

    let imageUrl = certificateDraft.imageUrl;

    if (certificateImageFile) {
      const uploadResult = await uploadCertificateImage(token, certificateImageFile);

      if (!uploadResult.ok) {
        setCertificateFeedback({ type: "error", message: uploadResult.error });
        setSavingKey("");
        return;
      }

      imageUrl = uploadResult.data.absoluteUrl || uploadResult.data.url;
    }

    const payload = {
      title: certificateDraft.title,
      imageUrl,
      sortOrder: certificateDraft.sortOrder,
      isVisible: certificateDraft.isVisible
    };

    const result = await request(certificateDraft.id ? `/certificates/${certificateDraft.id}` : "/certificates", {
      method: certificateDraft.id ? "PUT" : "POST",
      token,
      body: payload
    });

    if (result.ok) {
      setCertificateFeedback({ type: "success", message: "Certificate saved." });
      setCertificateDraft(createEmptyCertificate());
      setCertificateImageFile(null);
      await loadAdminData(token);
    } else {
      setCertificateFeedback({ type: "error", message: result.error });
    }

    setSavingKey("");
  }

  function editCertificate(certificate) {
    setActiveView("Certificates");
    setCertificateDraft({
      id: String(certificate.id),
      title: certificate.title || "",
      imageUrl: certificate.imageUrl || "",
      imageName: "",
      sortOrder: Number(certificate.sortOrder || 0),
      isVisible: Boolean(certificate.isVisible)
    });
    setCertificateImageFile(null);
    setCertificateFeedback(null);
  }

  async function deleteCertificateItem(certificate) {
    setSavingKey(`delete-certificate-${certificate.id}`);
    setCertificateFeedback(null);

    const result = await request(`/certificates/${certificate.id}`, {
      method: "DELETE",
      token
    });

    if (result.ok) {
      if (certificateDraft.id === String(certificate.id)) {
        setCertificateDraft(createEmptyCertificate());
        setCertificateImageFile(null);
      }
      setCertificateFeedback({ type: "success", message: "Certificate deleted." });
      await loadAdminData(token);
    } else {
      setCertificateFeedback({ type: "error", message: result.error });
    }

    setSavingKey("");
  }

  async function deleteCourseItem(course) {
    if (!window.confirm(`Are you sure you want to delete course "${course.title}"?`)) {
      return;
    }
    setSavingKey(`delete-course-${course.id}`);
    setCourseFeedback(null);

    const result = await request(`/courses/${course.id}`, {
      method: "DELETE",
      token
    });

    if (result.ok) {
      if (courseDraft.id === String(course.id)) {
        setCourseDraft(createEmptyCourse());
        setCourseBrochureFile(null);
      }
      setCourseFeedback({ type: "success", message: "Course deleted." });
      await loadAdminData(token);
    } else {
      setCourseFeedback({ type: "error", message: result.error });
    }

    setSavingKey("");
  }

  async function deleteTeacherItem(teacher) {
    if (!window.confirm(`Are you sure you want to delete teacher "${teacher.name}"?`)) {
      return;
    }
    setSavingKey(`delete-teacher-${teacher.id}`);
    setTeacherFeedback(null);

    const result = await request(`/teachers/${teacher.id}`, {
      method: "DELETE",
      token
    });

    if (result.ok) {
      if (teacherDraft.id === String(teacher.id)) {
        setTeacherDraft(createEmptyTeacher());
        setTeacherImageFile(null);
      }
      setTeacherFeedback({ type: "success", message: "Teacher deleted." });
      await loadAdminData(token);
    } else {
      setTeacherFeedback({ type: "error", message: result.error });
    }

    setSavingKey("");
  }

  async function submitTeacher(event) {
    event.preventDefault();
    setSavingKey("teacher");
    setTeacherFeedback(null);

    let photoUrl = teacherDraft.photoUrl;

    if (teacherImageFile) {
      const uploadResult = await uploadTeacherImage(token, teacherImageFile);

      if (!uploadResult.ok) {
        setTeacherFeedback({ type: "error", message: uploadResult.error });
        setSavingKey("");
        return;
      }

      photoUrl = uploadResult.data.absoluteUrl || uploadResult.data.url;
    }

    const payload = {
      name: teacherDraft.name,
      photoUrl,
      linkedinUrl: teacherDraft.linkedinUrl,
      employmentStatus: teacherDraft.employmentStatus,
      credentials: teacherDraft.credentials,
      sortOrder: teacherDraft.sortOrder,
      isVisible: teacherDraft.isVisible
    };

    const result = await request(teacherDraft.id ? `/teachers/${teacherDraft.id}` : "/teachers", {
      method: teacherDraft.id ? "PUT" : "POST",
      token,
      body: payload
    });

    if (result.ok) {
      setTeacherFeedback({ type: "success", message: "Teacher saved." });
      setTeacherDraft(createEmptyTeacher());
      setTeacherImageFile(null);
      await loadAdminData(token);
    } else {
      setTeacherFeedback({ type: "error", message: result.error });
    }

    setSavingKey("");
  }

  function editTeacher(teacher) {
    setActiveView("Teachers");
    setTeacherDraft({
      id: String(teacher.id),
      name: teacher.name || "",
      photoUrl: teacher.photoUrl || "",
      photoName: "",
      linkedinUrl: teacher.linkedinUrl || "",
      employmentStatus: teacher.employmentStatus || "",
      credentials: teacher.credentials || "",
      sortOrder: Number(teacher.sortOrder || 0),
      isVisible: Boolean(teacher.isVisible)
    });
    setTeacherImageFile(null);
    setTeacherFeedback(null);
  }

  const navigation = ["Dashboard", "Packages", "Curriculum", "FAQ", "Settings"];

  if (booting) {
    return <main className="loading-shell">Loading admin workspace...</main>;
  }

  if (!admin) {
    return <LoginView onLogin={handleLogin} authError={authError} isSubmitting={authLoading} />;
  }

  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div className="brand">DigiNext Admin</div>
        <div className="workspace-badge">{admin.role.replaceAll("_", " ")}</div>
        <nav>
          {navigation.map((item) => (
            <button key={item} type="button" className={item === activeView ? "nav-link active" : "nav-link"} onClick={() => setActiveView(item)}>
              {item}
            </button>
          ))}
        </nav>
        <div className="sidebar-meta">
          <strong>{admin.name}</strong>
          <span>{admin.email}</span>
          <button type="button" className="logout-link" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <section className="content">
        {activeView === "Dashboard" ? (
          <DashboardView
            dashboard={dashboard}
            leads={leads}
            videoSettings={videoSettings}
            onSaveVideoSettings={saveVideoSettings}
            isSavingVideo={savingKey === "video_settings"}
            videoFeedback={settingsFeedback}
          />
        ) : null}
        {activeView === "Packages" ? (
          <PackagesView
            packageSettings={packageSettings}
            onSavePackageSettings={savePackageSettings}
            isSavingPackage={savingKey === "package_settings"}
            packageFeedback={packageFeedback}
          />
        ) : null}
        {activeView === "Curriculum" ? (
          <CurriculumView
            curriculumSettings={curriculumSettings}
            onSaveCurriculumSettings={saveCurriculumSettings}
            isSavingCurriculum={savingKey === "curriculum_settings"}
            curriculumFeedback={curriculumFeedback}
          />
        ) : null}
        {activeView === "FAQ" ? (
          <FaqAdminView
            faqSettings={faqSettings}
            onSaveFaqSettings={saveFaqSettings}
            isSavingFaq={savingKey === "faq_settings"}
            faqFeedback={faqFeedback}
          />
        ) : null}
        {activeView === "Settings" ? (
          <SettingsView
            footerSettings={footerSettings}
            onSaveFooterSettings={saveFooterSettings}
            isSavingFooter={savingKey === "footer_settings"}
            footerFeedback={footerFeedback}
            onUpdatePassword={updatePassword}
          />
        ) : null}
      </section>
    </main>
  );
}
