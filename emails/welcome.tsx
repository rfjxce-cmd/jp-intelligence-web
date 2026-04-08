import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  businessName: string;
  services: string[];
  tempPassword: string;
  loginUrl: string;
}

export default function WelcomeEmail({
  name,
  businessName,
  services,
  tempPassword,
  loginUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to JP Intelligence — we&apos;re setting up your AI system now.
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerStyle}>
            <Text style={logoStyle}>
              <span style={{ color: "#c9a84c" }}>JP</span>{" "}
              <span style={{ color: "#f5f5f5" }}>Intelligence</span>
            </Text>
            <Text style={taglineStyle}>AI Automation Agency</Text>
          </Section>

          {/* Gold bar */}
          <Section style={goldBarStyle} />

          {/* Main content */}
          <Section style={mainStyle}>
            <Heading style={h1Style}>Welcome, {name}. 🎉</Heading>

            <Text style={bodyTextStyle}>
              Your payment has been received and we&apos;re officially getting
              to work on your AI system for{" "}
              <strong style={{ color: "#f5f5f5" }}>{businessName}</strong>.
              Expect everything to be live within <strong style={{ color: "#c9a84c" }}>5–7 business days</strong>.
            </Text>

            {/* Services purchased */}
            <Section style={cardStyle}>
              <Text style={sectionLabelStyle}>Services Purchased</Text>
              {services.map((service) => (
                <Row key={service} style={{ marginBottom: "8px" }}>
                  <Column>
                    <Text style={serviceItemStyle}>
                      <span style={{ color: "#c9a84c", marginRight: "8px" }}>✓</span>
                      {service}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Login credentials */}
            <Section style={credCardStyle}>
              <Text style={sectionLabelStyle}>Your Login Credentials</Text>
              <Row>
                <Column>
                  <Text style={credLabelStyle}>Email</Text>
                  <Text style={credValueStyle}>Your registered email</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={credLabelStyle}>Temporary Password</Text>
                  <Text style={credPasswordStyle}>{tempPassword}</Text>
                </Column>
              </Row>
              <Text style={credNoteStyle}>
                You&apos;ll be prompted to change this on first login.
              </Text>
            </Section>

            {/* CTA button */}
            <Section style={{ textAlign: "center", margin: "28px 0" }}>
              <Link href={loginUrl} style={ctaButtonStyle}>
                Log In to Your Dashboard →
              </Link>
            </Section>

            <Hr style={dividerStyle} />

            {/* What happens next */}
            <Text style={sectionLabelStyle}>What Happens Next</Text>

            {[
              {
                num: "01",
                title: "We build your system",
                body: "Our team gets to work immediately. We'll configure and customize everything for your business.",
              },
              {
                num: "02",
                title: "You review before go-live",
                body: "We'll send you a preview link so you can approve everything before it goes live on your site.",
              },
              {
                num: "03",
                title: "You get the installation guide",
                body: "Once live, you'll receive a separate email with your unique embed code and step-by-step installation instructions.",
              },
            ].map((step) => (
              <Row key={step.num} style={{ marginBottom: "16px" }}>
                <Column style={{ width: "40px", verticalAlign: "top" }}>
                  <Text style={stepNumStyle}>{step.num}</Text>
                </Column>
                <Column>
                  <Text style={stepTitleStyle}>{step.title}</Text>
                  <Text style={stepBodyStyle}>{step.body}</Text>
                </Column>
              </Row>
            ))}

            <Hr style={dividerStyle} />

            <Text style={bodyTextStyle}>
              Questions? Just reply to this email — we&apos;re here to help.
            </Text>

            <Text style={signatureStyle}>
              The JP Intelligence Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              © {new Date().getFullYear()} JP Intelligence · AI Automation for Local Businesses
            </Text>
            <Text style={footerTextStyle}>
              You received this because you signed up at{" "}
              <Link href="https://jpintelligence.ai" style={{ color: "#c9a84c" }}>
                jpintelligence.ai
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const bodyStyle = {
  backgroundColor: "#080808",
  fontFamily: "system-ui, -apple-system, sans-serif",
  margin: "0",
  padding: "40px 16px",
};

const containerStyle = {
  maxWidth: "580px",
  margin: "0 auto",
  backgroundColor: "#0a0a0a",
  borderRadius: "16px",
  border: "1px solid #1a1a1a",
  overflow: "hidden" as const,
};

const headerStyle = {
  padding: "32px 40px 24px",
  textAlign: "center" as const,
};

const logoStyle = {
  fontSize: "22px",
  fontWeight: "700",
  letterSpacing: "-0.5px",
  margin: "0",
};

const taglineStyle = {
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "#555555",
  margin: "4px 0 0",
};

const goldBarStyle = {
  height: "1px",
  background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
  margin: "0",
};

const mainStyle = {
  padding: "36px 40px",
};

const h1Style = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0 0 16px",
  letterSpacing: "-0.5px",
};

const bodyTextStyle = {
  fontSize: "15px",
  color: "#888888",
  lineHeight: "1.7",
  margin: "0 0 24px",
};

const cardStyle = {
  backgroundColor: "#111111",
  border: "1px solid #1a1a1a",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const credCardStyle = {
  backgroundColor: "#111111",
  border: "1px solid #c9a84c",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const sectionLabelStyle = {
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "#555555",
  margin: "0 0 14px",
};

const serviceItemStyle = {
  fontSize: "14px",
  color: "#f5f5f5",
  margin: "0",
};

const credLabelStyle = {
  fontSize: "11px",
  color: "#555555",
  fontWeight: "600",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const credValueStyle = {
  fontSize: "14px",
  color: "#f5f5f5",
  margin: "0 0 14px",
};

const credPasswordStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#c9a84c",
  letterSpacing: "0.1em",
  backgroundColor: "#0a0a0a",
  padding: "10px 16px",
  borderRadius: "8px",
  fontFamily: "monospace",
  margin: "0 0 14px",
  display: "block" as const,
};

const credNoteStyle = {
  fontSize: "12px",
  color: "#444444",
  margin: "0",
};

const ctaButtonStyle = {
  display: "inline-block",
  backgroundColor: "#c9a84c",
  color: "#0a0a0a",
  fontWeight: "700",
  fontSize: "14px",
  padding: "14px 32px",
  borderRadius: "50px",
  textDecoration: "none",
};

const dividerStyle = {
  borderColor: "#1a1a1a",
  margin: "28px 0",
};

const stepNumStyle = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#c9a84c",
  backgroundColor: "#1a1a1a",
  borderRadius: "50%",
  width: "28px",
  height: "28px",
  textAlign: "center" as const,
  lineHeight: "28px",
  margin: "2px 0 0",
};

const stepTitleStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#f5f5f5",
  margin: "0 0 4px",
};

const stepBodyStyle = {
  fontSize: "13px",
  color: "#666666",
  lineHeight: "1.6",
  margin: "0",
};

const signatureStyle = {
  fontSize: "14px",
  color: "#c9a84c",
  fontWeight: "600",
  margin: "24px 0 0",
};

const footerStyle = {
  padding: "24px 40px",
  borderTop: "1px solid #111111",
  textAlign: "center" as const,
};

const footerTextStyle = {
  fontSize: "12px",
  color: "#333333",
  margin: "4px 0",
};
