"use client";

import { useEffect, useMemo, useState } from "react";

const navigation = ["Dashboard", "Courses", "Certificates", "Teachers", "Leads"];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000/api/v1";
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

function DashboardView({ dashboard }) {
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
          <p className="eyebrow">Single-city setup</p>
          <h2>Mumbai-only content</h2>
          <ul className="section-list">
            <li>All website courses are treated as Mumbai courses.</li>
            <li>City selectors have been removed from admin forms.</li>
            <li>The public website no longer shows city selection or labels.</li>
          </ul>
        </article>
        <article className="card">
          <p className="eyebrow">Workspace scope</p>
          <h2>Current admin controls</h2>
          <ul className="section-list">
            <li>Course creation and updates</li>
            <li>Certificate management</li>
            <li>Teacher management and lead review</li>
          </ul>
        </article>
      </section>
    </>
  );
}

function CoursesView({ courses, draft, setDraft, onFileChange, onEdit, onSubmit, feedback, isSaving }) {
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
            <button key={course.id} type="button" className="list-card" onClick={() => onEdit(course)}>
              <strong>{course.title}</strong>
              <span>
                {course.status} • {(course.faqs || []).length} FAQ{(course.faqs || []).length === 1 ? "" : "s"}
              </span>
            </button>
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

function TeachersView({ teachers, draft, setDraft, onFileChange, onEdit, onSubmit, feedback, isSaving }) {
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
            <button key={teacher.id} type="button" className="list-card" onClick={() => onEdit(teacher)}>
              <strong>{teacher.name}</strong>
              <span>
                Sort {teacher.sortOrder || 0} • {teacher.isVisible ? "Visible" : "Hidden"}
              </span>
            </button>
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
  const [savingKey, setSavingKey] = useState("");

  async function loadAdminData(activeToken) {
    const [dashboardResult, citiesResult, coursesResult, certificatesResult, teachersResult, leadsResult] = await Promise.all([
      request("/dashboard", { token: activeToken }),
      request("/cities"),
      request("/courses", { token: activeToken }),
      request("/certificates/admin/all", { token: activeToken }),
      request("/teachers?includeHidden=true", { token: activeToken }),
      request("/leads", { token: activeToken })
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
        {activeView === "Dashboard" ? <DashboardView dashboard={dashboard} /> : null}
        {activeView === "Courses" ? (
          <CoursesView
            courses={courses}
            draft={courseDraft}
            setDraft={setCourseDraft}
            onFileChange={(file) => {
              setCourseBrochureFile(file);
              setCourseDraft((current) => ({
                ...current,
                brochureName: file?.name || ""
              }));
            }}
            onEdit={editCourse}
            onSubmit={submitCourse}
            feedback={courseFeedback}
            isSaving={savingKey === "course"}
          />
        ) : null}
        {activeView === "Certificates" ? (
          <CertificatesView
            certificates={certificates}
            draft={certificateDraft}
            setDraft={setCertificateDraft}
            onFileChange={(file) => {
              setCertificateImageFile(file);
              setCertificateDraft((current) => ({
                ...current,
                imageName: file?.name || ""
              }));
            }}
            onEdit={editCertificate}
            onDelete={deleteCertificateItem}
            onSubmit={submitCertificate}
            feedback={certificateFeedback}
            isSaving={savingKey === "certificate"}
            isDeleting={savingKey.startsWith("delete-certificate-") ? savingKey.replace("delete-certificate-", "") : ""}
          />
        ) : null}
        {activeView === "Teachers" ? (
          <TeachersView
            teachers={teachers}
            draft={teacherDraft}
            setDraft={setTeacherDraft}
            onFileChange={(file) => {
              setTeacherImageFile(file);
              setTeacherDraft((current) => ({
                ...current,
                photoName: file?.name || ""
              }));
            }}
            onEdit={editTeacher}
            onSubmit={submitTeacher}
            feedback={teacherFeedback}
            isSaving={savingKey === "teacher"}
          />
        ) : null}
        {activeView === "Leads" ? <LeadsView leads={leads} /> : null}
      </section>
    </main>
  );
}
