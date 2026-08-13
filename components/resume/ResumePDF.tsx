import { Document, Page, Text, View, StyleSheet, Link, Svg, Path, Rect, Font } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/resume/types";

// Register Roboto font (supports Vietnamese and other extended Latin characters)
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontStyle: "italic",
    },
  ],
});

// SVG Icons
const EmailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill="#000000"
    />
  </Svg>
);

const LinkedInIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Rect width="24" height="24" rx="2" fill="#0077B5" />
    <Path
      d="M8 19H5V9h3v10zM6.5 7.5A1.5 1.5 0 118 6a1.5 1.5 0 01-1.5 1.5zM20 19h-3v-5c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.5-.1.8v5.4h-3V9h3v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4v6z"
      fill="#ffffff"
    />
  </Svg>
);

const GitHubIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"
      fill="#000000"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      fill="#000000"
    />
  </Svg>
);

const LocationIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill="#000000"
    />
  </Svg>
);

const ExternalLinkIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
      fill="#0066cc"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 3,
  },
  contactItem: {
    fontSize: 10,
    color: "#000000",
  },
  contactLink: {
    fontSize: 10,
    color: "#0066cc",
    textDecoration: "none",
  },
  contactSeparator: {
    fontSize: 10,
    color: "#000000",
    marginHorizontal: 3,
  },
  iconLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  iconBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  section: {
    marginTop: 4,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 1,
    letterSpacing: 1,
  },
  educationItem: {
    marginBottom: 2,
  },
  educationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  institutionName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  locationDate: {
    fontSize: 10,
    color: "#000000",
    fontStyle: "italic",
    textAlign: "right",
  },
  degreeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  degree: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#000000",
  },
  experienceItem: {
    marginBottom: 2,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  dateRange: {
    fontSize: 10,
    color: "#000000",
    textAlign: "right",
  },
  companyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 1,
  },
  bullet: {
    fontSize: 10,
    marginRight: 4,
  },
  bulletText: {
    fontSize: 10,
    color: "#000000",
    flex: 1,
  },
  projectItem: {
    marginBottom: 2,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  projectName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  skillsContainer: {
    marginTop: 2,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
  },
  skillItems: {
    fontSize: 10,
    color: "#000000",
  },
  profilesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  profileColumn: {
    width: "33.33%",
    marginBottom: 2,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileBullet: {
    fontSize: 10,
    marginRight: 3,
  },
  profileName: {
    fontSize: 10,
    color: "#000000",
  },
  profileUsername: {
    fontSize: 10,
    color: "#0066cc",
    textDecoration: "none",
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 2,
    marginLeft: 8,
  },
  achievementBullet: {
    fontSize: 10,
    marginRight: 4,
  },
  achievementText: {
    fontSize: 10,
    color: "#000000",
    flex: 1,
  },
  certificationText: {
    fontSize: 10,
    color: "#000000",
    marginBottom: 2,
  },
});

const resolveUrl = (url: string | undefined | null, origin: string): string | null => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
    return url;
  }
  return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
};

interface ResumePDFProps {
  data: ResumeData;
  type?: string;
  origin?: string;
}

const ResumePDF = ({ data, type = "default", origin = "" }: ResumePDFProps) => (
  <Document title={`Resume - ${data.personal.name} (${type})`}>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <View style={styles.contactRow}>
          {data.personal.location && (
            <View style={styles.iconLink}>
              <LocationIcon />
              <Text style={styles.contactItem}>{data.personal.location}</Text>
            </View>
          )}
          {data.personal.email && (
            <>
              {data.personal.location && <Text style={styles.contactSeparator}>|</Text>}
              <View style={styles.iconLink}>
                <EmailIcon />
                <Link src={`mailto:${data.personal.email}`} style={styles.contactLink}>
                  {data.personal.email}
                </Link>
              </View>
            </>
          )}
          {data.personal.phone && (
            <>
              <Text style={styles.contactSeparator}>|</Text>
              <View style={styles.iconLink}>
                <PhoneIcon />
                <Link src={`tel:${data.personal.phone}`} style={styles.contactLink}>
                  {data.personal.phone}
                </Link>
              </View>
            </>
          )}
          {data.personal.github && (
            <>
              <Text style={styles.contactSeparator}>|</Text>
              <Link src={data.personal.github}>
                <View style={[styles.iconBadge, { borderColor: "#333333" }]}>
                  <GitHubIcon />
                </View>
              </Link>
            </>
          )}
          {data.personal.linkedin && (
            <>
              <Text style={styles.contactSeparator}>|</Text>
              <Link src={data.personal.linkedin}>
                <View style={[styles.iconBadge, { borderColor: "#0077B5" }]}>
                  <LinkedInIcon />
                </View>
              </Link>
            </>
          )}
          {data.personal.website && (
            <>
              <Text style={styles.contactSeparator}>|</Text>
              <View style={styles.iconLink}>
                <Link src={data.personal.website} style={styles.contactLink}>
                  {data.personal.website.replace(/^https?:\/\//, "")}
                </Link>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Summary Section */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={{ fontSize: 10, color: "#000000", lineHeight: 1.4 }}>{data.summary}</Text>
        </View>
      )}

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <View style={styles.educationRow}>
              <Text style={styles.institutionName}>{edu.institution}</Text>
              <Text style={styles.locationDate}>
                {edu.startYear ? `${edu.startYear} – ` : ""}
                {edu.graduationYear} | {edu.location}
              </Text>
            </View>
            <View style={styles.degreeRow}>
              <Text style={styles.degree}>
                {edu.degree}
                {edu.gpa ? `. GPA: ${edu.gpa}` : ""}
              </Text>
            </View>
            {edu.bullets && edu.bullets.length > 0 && (
              <View style={styles.bulletList}>
                {edu.bullets.map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={{ fontSize: 11, fontWeight: "bold", color: "#000000" }}>{exp.company}</Text>
              <Text style={styles.dateRange}>
                {exp.startDate} – {exp.endDate} | {exp.location}
              </Text>
            </View>
            <View style={styles.companyRow}>
              <Text style={{ fontSize: 10, fontStyle: "italic", color: "#000000" }}>{exp.position}</Text>
            </View>
            {exp.achievements && (
              <View style={styles.bulletList}>
                {exp.achievements.map((achievement, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            )}
            {exp.projects &&
              exp.projects.map((project, pIdx) => {
                const formattedUrl = resolveUrl(
                  project.link || project.url || project.githubUrl || project.liveUrl || project.evidence,
                  origin
                );

                return (
                  <View key={pIdx} style={{ marginTop: 3 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      {formattedUrl ? (
                        <Link src={formattedUrl} style={{ textDecoration: "none" }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#0066cc" }}>{project.name}</Text>
                            <ExternalLinkIcon />
                          </View>
                        </Link>
                      ) : (
                        <Text style={{ fontSize: 10, fontWeight: "bold" }}>{project.name}</Text>
                      )}
                      <Text style={{ fontSize: 9, color: "#666" }}>{project.period}</Text>
                    </View>
                    <Text style={{ fontSize: 9, color: "#0066cc", marginBottom: 1 }}>
                      {project.role} {project.techStack?.length ? `| Tech: ${project.techStack.join(", ")}` : ""}
                    </Text>
                    <View style={styles.bulletList}>
                      {project.achievements &&
                        project.achievements.map((achievement, idx) => (
                          <View key={idx} style={styles.bulletItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{achievement}</Text>
                          </View>
                        ))}
                    </View>
                  </View>
                );
              })}
          </View>
        ))}
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((project, index) => {
          const formattedUrl = resolveUrl(
            project.evidence || project.link || project.url || project.githubUrl || project.liveUrl,
            origin
          );

          return (
            <View key={index} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                {formattedUrl ? (
                  <Link src={formattedUrl} style={{ textDecoration: "none" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Text style={styles.projectName}>{project.title}</Text>
                      <ExternalLinkIcon />
                    </View>
                  </Link>
                ) : (
                  <Text style={styles.projectName}>{project.title}</Text>
                )}
                <Text style={styles.dateRange}>
                  {project.period}
                  {project.location ? ` | ${project.location}` : ""}
                </Text>
              </View>
              {project.role && (
                <View style={{ marginBottom: 2 }}>
                  <Text style={{ fontSize: 10, fontStyle: "italic", color: "#000000" }}>{project.role}</Text>
                </View>
              )}
              <View style={styles.bulletList}>
                {project.achievements &&
                  project.achievements.map((achievement, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{achievement}</Text>
                    </View>
                  ))}
              </View>
            </View>
          );
        })}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skillCategory, index) => (
            <View key={index} style={{ marginBottom: 2 }}>
              <Text>
                <Text style={styles.skillCategory}>{skillCategory.category}: </Text>
                <Text style={styles.skillItems}>{skillCategory.items.join(", ")}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Coding Profiles Section */}
      {data.codingProfiles && data.codingProfiles.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coding Profiles</Text>
          <View style={styles.profilesContainer}>
            {data.codingProfiles.map((profile, index) => (
              <View key={index} style={styles.profileColumn}>
                <View style={styles.profileItem}>
                  <Text style={styles.profileBullet}>•</Text>
                  <Text style={styles.profileName}>{profile.platform} - </Text>
                  <Link src={profile.url} style={styles.profileUsername}>
                    {profile.username}
                  </Link>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Achievements Section */}
      {data.achievements && data.achievements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {data.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Text style={styles.achievementBullet}>•</Text>
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, index) => (
            <Text key={index} style={styles.certificationText}>
              {cert}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
