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

interface BotReadyEmailProps {
  name: string;
  businessName: string;
  embedCode: string;
  loomUrl: string;
}

const installationSteps: Record<
  string,
  { icon: string; steps: string[] }
> = {
  Squarespace: {
    icon: "🟡",
    steps: [
      "Go to your Squarespace dashboard and click Pages.",
      "Navigate to the page where you want the chatbot to appear (or apply site-wide).",
      "Click Edit, then click any text block to enter edit mode.",
      "Click the ⊕ button to add a new block, then choose Code.",
      "Paste the embed code into the code block and click Apply.",
      "For site-wide installation: go to Settings → Advanced → Code Injection, paste in the Footer section.",
    ],
  },
  Wix: {
    icon: "🔵",
    steps: [
      "Log in to your Wix account and open the Wix Editor for your site.",
      "Click Add (+) in the left panel, then select Embed Code → Embed HTML.",
      "A blank HTML iframe will appear on your page — click Enter Code.",
      "Paste the embed code into the text area and click Update.",
      "For site-wide installation: go to Settings → Custom Code → + Add Code, set it to load on All Pages in the Body - End.",
    ],
  },
  WordPress: {
    icon: "🔷",
    steps: [
      "Log in to your WordPress admin dashboard.",
      "Go to Appearance → Theme Editor (or use a plugin like Insert Headers and Footers).",
      "If using Theme Editor: open footer.php and paste the code just before </body>.",
      "If using a plugin: go to Settings → Insert Headers and Footers → Scripts in Footer section.",
      "Save changes and visit your live site to confirm the chatbot appears.",
    ],
  },
  Shopify: {
    icon: "🟢",
    steps: [
      "Log in to your Shopify admin and go to Online Store → Themes.",
      "Click Actions → Edit Code next to your active theme.",
      "In the left panel, under Layout, click theme.liquid.",
      "Find the closing </body> tag (near the bottom of the file).",
      "Paste the embed code immediately before </body>.",
      "Click Save. The chatbot will now appear on all pages of your store.",
    ],
  },
  "Generic HTML": {
    icon: "⚪",
    steps: [
      "Open the HTML file for any page where you want the chatbot to appear.",
      "Locate the closing </body> tag at the bottom of the file.",
      "Paste the embed code immediately before </body>.",
      "Save the file and re-upload it to your hosting server if needed.",
      "For site-wide installation, add the code to your main template or layout file.",
    ],
  },
};

export default function BotReadyEmail({
  name,
  businessName,
  embedCode,
  loomUrl,
}: BotReadyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your AI chatbot is live — here&apos;s your embed code and installation guide.
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

          <Section style={goldBarStyle} />

          {/* Main content */}
          <Section style={mainStyle}>
            {/* Live badge */}
            <Section style={{ textAlign: "center", marginBottom: "24px" }}>
              <Text style={liveBadgeStyle}>● LIVE</Text>
            </Section>

            <Heading style={h1Style}>
              Your AI chatbot is ready, {name}.
            </Heading>

            <Text style={bodyTextStyle}>
              Great news —{" "}
              <strong style={{ color: "#f5f5f5" }}>
                your bot for {businessName} is live and ready to install
              </strong>
              . Follow the instructions below to add it to your website.
              It should take less than 5 minutes.
            </Text>

            {/* Video walkthrough */}
            {loomUrl && (
              <Section style={videoCardStyle}>
                <Text style={sectionLabelStyle}>Video Walkthrough</Text>
                <Text style={{ fontSize: "14px", color: "#888888", margin: "0 0 14px" }}>
                  Watch this quick video to see how to install your chatbot step by step.
                </Text>
                <Link href={loomUrl} style={ctaButtonStyle}>
                  ▶ Watch Installation Video
                </Link>
              </Section>
            )}

            {/* Embed code */}
            <Section style={codeCardStyle}>
              <Text style={sectionLabelStyle}>Your Unique Embed Code</Text>
              <Text style={{ fontSize: "13px", color: "#666666", margin: "0 0 12px" }}>
                Copy this code and paste it into your website using the instructions below.
              </Text>
              <Text style={codeBlockStyle}>{embedCode}</Text>
            </Section>

            <Hr style={dividerStyle} />

            {/* Platform tabs */}
            <Text style={sectionLabelStyle}>
              Installation Instructions — Choose Your Platform
            </Text>

            {Object.entries(installationSteps).map(([platform, { icon, steps }]) => (
              <Section key={platform} style={platformCardStyle}>
                <Text style={platformTitleStyle}>
                  {icon} {platform}
                </Text>
                {steps.map((step, i) => (
                  <Row key={i} style={{ marginBottom: "10px" }}>
                    <Column style={{ width: "28px", verticalAlign: "top" }}>
                      <Text style={stepNumStyle}>{i + 1}</Text>
                    </Column>
                    <Column>
                      <Text style={stepBodyStyle}>{step}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            ))}

            <Hr style={dividerStyle} />

            {/* Help section */}
            <Section style={helpCardStyle}>
              <Text style={helpTitleStyle}>Need Help Installing?</Text>
              <Text style={helpBodyStyle}>
                No problem at all — just reply to this email and we&apos;ll walk you
                through it personally. We&apos;re happy to jump on a quick screen share
                if needed.
              </Text>
              <Link href="mailto:support@jpintelligence.ai" style={replyButtonStyle}>
                Reply to This Email →
              </Link>
            </Section>

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
  maxWidth: "600px",
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

const liveBadgeStyle = {
  display: "inline-block",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.2em",
  color: "#22c55e",
  backgroundColor: "#052e16",
  border: "1px solid #166534",
  borderRadius: "50px",
  padding: "4px 14px",
  margin: "0",
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

const videoCardStyle = {
  backgroundColor: "#111111",
  border: "1px solid #c9a84c",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 20px",
};

const codeCardStyle = {
  backgroundColor: "#0d0d0d",
  border: "1px solid #2a2a2a",
  borderRadius: "12px",
  padding: "20px 24px",
  margin: "0 0 28px",
};

const codeBlockStyle = {
  fontSize: "12px",
  fontFamily: "monospace",
  color: "#c9a84c",
  backgroundColor: "#111111",
  border: "1px solid #1a1a1a",
  borderRadius: "8px",
  padding: "16px",
  wordBreak: "break-all" as const,
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const sectionLabelStyle = {
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "#555555",
  margin: "0 0 14px",
};

const ctaButtonStyle = {
  display: "inline-block",
  backgroundColor: "#c9a84c",
  color: "#0a0a0a",
  fontWeight: "700",
  fontSize: "13px",
  padding: "12px 24px",
  borderRadius: "50px",
  textDecoration: "none",
};

const dividerStyle = {
  borderColor: "#1a1a1a",
  margin: "28px 0",
};

const platformCardStyle = {
  backgroundColor: "#111111",
  border: "1px solid #1a1a1a",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "12px",
};

const platformTitleStyle = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0 0 14px",
};

const stepNumStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#c9a84c",
  backgroundColor: "#1a1a1a",
  borderRadius: "50%",
  width: "22px",
  height: "22px",
  textAlign: "center" as const,
  lineHeight: "22px",
  margin: "1px 0 0",
};

const stepBodyStyle = {
  fontSize: "13px",
  color: "#777777",
  lineHeight: "1.65",
  margin: "0",
};

const helpCardStyle = {
  backgroundColor: "#111111",
  border: "1px solid #1a1a1a",
  borderRadius: "12px",
  padding: "24px",
  margin: "0 0 28px",
  textAlign: "center" as const,
};

const helpTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0 0 10px",
};

const helpBodyStyle = {
  fontSize: "14px",
  color: "#666666",
  lineHeight: "1.65",
  margin: "0 0 18px",
};

const replyButtonStyle = {
  display: "inline-block",
  border: "1px solid #c9a84c",
  color: "#c9a84c",
  fontWeight: "600",
  fontSize: "13px",
  padding: "10px 22px",
  borderRadius: "50px",
  textDecoration: "none",
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
