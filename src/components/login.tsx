"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const pwChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^a-zA-Z0-9]/.test(password),
  };
  const pwScore = Object.values(pwChecks).filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"][pwScore];
  const strengthColor = ["", "#f87171", "#fb923c", "#facc15", "#4ade80", "#00c9a0"][pwScore];

  const validate = (overrides: any = {}) => {
    const u = overrides.username ?? username;
    const e = overrides.email ?? email;
    const p = overrides.password ?? password;
    const errs: any = {};
    if (!u) errs.username = "Username is required";
    if (!e) errs.email = "Email is required";
    else if (!e.endsWith("@gmail.com")) errs.email = "Must end with @gmail.com";
    if (!p) errs.password = "Password is required";
    return errs;
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev: any) => ({ ...prev, [field]: true }));
    setErrors((prev: any) => ({ ...prev, ...validate({ [field]: value }) }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true });
    setErrors(validate());
  };

  // Styles
  const colors = {
    bg: "#0d1f2d",
    card: "#ffffff",
    inputBg: "#132230",
    inputBorder: "#1e3448",
    inputText: "#ffffff",
    primary: "#00c9a0",
    link: "#00e5cc",
    error: "#f87171",
    label: "#64748b",
    muted: "#94a3b8",
    heading: "#111827",
    subtext: "#6b7280",
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: `1px solid ${touched[field] && errors[field] ? colors.error : colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.inputText,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  });

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.07em",
    color: colors.label,
    marginBottom: "6px",
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, display: "flex", flexDirection: "column" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 28, height: 28, background: colors.primary, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>SecureGate</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a href="#" style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>Solutions</a>
          <a href="#" style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>Pricing</a>
          <a href="#" style={{ color: colors.primary, fontSize: 14, textDecoration: "none", border: `1px solid ${colors.primary}`, padding: "4px 14px", borderRadius: 6, fontWeight: 500 }}>
            Sign In
          </a>
        </div>
      </nav>

      {/* Center content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ background: colors.card, borderRadius: 16, padding: "32px", width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, background: colors.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span style={{ fontWeight: 600, color: colors.heading, fontSize: 15 }}>SecureLogin</span>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.heading, margin: "0 0 4px" }}>Welcome back</h1>
          <p style={{ fontSize: 13, color: colors.subtext, margin: "0 0 24px" }}>Sign in to continue to your account</p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); if (touched.username) setErrors(validate({ username: e.target.value })); }}
                onBlur={(e) => handleBlur("username", e.target.value)}
                style={inputStyle("username")}
              />
              {touched.username && errors.username && (
                <p style={{ color: colors.error, fontSize: 11, marginTop: 4 }}>{errors.username}</p>
              )}
              {!errors.username && username && (
                <p style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>Case sensitive — "John" and "john" are different</p>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(validate({ email: e.target.value })); }}
                onBlur={(e) => handleBlur("email", e.target.value)}
                style={inputStyle("email")}
              />
              {touched.email && errors.email && (
                <p style={{ color: colors.error, fontSize: 11, marginTop: 4 }}>{errors.email}</p>
              )}
              {!errors.email && email && (
                <p style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>Must end with @gmail.com</p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (touched.password) setErrors(validate({ password: e.target.value })); }}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                  style={{ ...inputStyle("password"), paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>

              {/* Strength bar */}
              {password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ height: 3, flex: 1, borderRadius: 9999, background: i <= pwScore ? strengthColor : "#e2e8f0" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: strengthColor }}>{strengthLabel}</p>
                </div>
              )}

              {/* Checklist */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px", marginTop: 8 }}>
                {[
                  { key: "length", label: "8+ characters" },
                  { key: "lowercase", label: "Lowercase letter" },
                  { key: "uppercase", label: "Uppercase letter" },
                  { key: "number", label: "Number" },
                  { key: "symbol", label: "Symbol" },
                ].map(({ key, label }) => (
                  <p key={key} style={{ fontSize: 11, color: pwChecks[key] ? colors.primary : colors.muted, margin: "2px 0", display: "flex", alignItems: "center", gap: 4 }}>
                    <span>{pwChecks[key] ? "✓" : "○"}</span>{label}
                  </p>
                ))}
              </div>

              {touched.password && errors.password && (
                <p style={{ color: colors.error, fontSize: 11, marginTop: 4 }}>{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              style={{ width: "100%", padding: "11px", borderRadius: 8, background: colors.primary, color: "#fff", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#00b08c")}
              onMouseOut={(e) => (e.currentTarget.style.background = colors.primary)}
            >
              Sign in
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          {/* Sign up */}
          <p style={{ textAlign: "center", fontSize: 13, color: colors.subtext, margin: 0 }}>
            Don&apos;t have an account?{" "}
            <a href="#" style={{ color: colors.link, fontWeight: 500, textDecoration: "none" }}>Create one</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#64748b" }}>
          <span style={{ color: colors.primary, fontWeight: 600 }}>SecureGate</span> © 2024 SecureGate Inc. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {["Privacy Policy", "Terms of Service", "Help Center"].map(link => (
            <a key={link} href="#" style={{ fontSize: 12, color: "#64748b", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
