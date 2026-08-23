
import re

with open('cover-letter.html', 'r') as f:
    content = f.read()

# I will replace the main body to use a grid for the highlights, and add a technical arsenal section.
main_start = content.find('<main')
main_end = content.find('</main>') + 7

before_main = content[:main_start]
after_main = content[main_end:]

new_main = """
    <main style="flex-grow: 1; display: flex; justify-content: center; align-items: center; padding: 4rem 1.5rem; position: relative; z-index: 10; min-height: 80vh;">
        <div class="reveal" style="max-width: 1000px; width: 100%; padding: 4rem; background: var(--md-sys-color-surface); border-radius: var(--md-shape-corner-xl); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); border: 1px solid var(--md-sys-color-outline); box-shadow: 0 20px 40px rgba(0,0,0,0.1); position: relative; overflow: hidden;">
            
            <!-- Fluid Glass Accent -->
            <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: var(--md-sys-color-tertiary); filter: blur(80px); opacity: 0.2; border-radius: 50%; pointer-events: none;"></div>
            <div style="position: absolute; bottom: -50px; left: -50px; width: 250px; height: 250px; background: var(--md-sys-color-primary); filter: blur(90px); opacity: 0.15; border-radius: 50%; pointer-events: none;"></div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem; border-bottom: 1px solid var(--md-sys-color-outline); padding-bottom: 2.5rem; position: relative;">
                <div style="display: flex; align-items: center; gap: 1.5rem;">
                    <img src="main_profile.jpg" alt="Chinmay Dhok" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 2px solid var(--md-sys-color-primary); box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                    <div>
                        <h1 style="color: var(--md-sys-color-primary); margin: 0; font-size: 2.5rem; letter-spacing: -1px; font-weight: 700;">Chinmay Dhok</h1>
                        <p style="color: var(--md-sys-color-secondary); margin: 0; font-size: 1.2rem; font-weight: 500; margin-top: 0.3rem;">Senior Information Security Analyst</p>
                    </div>
                </div>
                <!-- Download PDF Button placed at the top -->
                <a href="Chinmay_Dhok_Cover_Letter.pdf" download class="nav-btn" style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="material-symbols-rounded" style="font-size: 1.2rem;">download</span>
                    Download PDF
                </a>
            </div>

            <h2 style="margin-top: 1.5rem; font-size: 1.75rem; color: var(--md-sys-color-on-background); font-weight: 600;">To Whom It May Concern,</h2>
            
            <p style="line-height: 1.8; font-size: 1.2rem; color: var(--md-sys-color-on-background); font-weight: 300;">
                I am writing to express my strong interest in senior-level Information Security and Cloud Architecture roles. Over the past 6 years, I have successfully scaled enterprise cloud environments across GCP, Azure, and AWS, specializing in Zero-Trust architectures and security automation.
            </p>

            <p style="line-height: 1.8; font-size: 1.2rem; color: var(--md-sys-color-on-background); font-weight: 300;">
                Beyond technical execution, my core strength lies in translating complex security requirements into actionable business outcomes. I have a proven track record of leading cross-functional engineering teams, guiding organizations through rigorous compliance audits, and fostering a culture of security-first development without compromising deployment velocity. I invite you to explore my <a href="/" style="color: var(--md-sys-color-primary); font-weight: 500; text-decoration: none;">interactive portfolio</a> to see a comprehensive view of my strategic playbook and career progression.
            </p>
            
            <h3 style="margin-top: 3rem; margin-bottom: 1.5rem; font-size: 1.4rem; color: var(--md-sys-color-on-background); font-weight: 600;">Technical Arsenal</h3>
            <div class="skill-badges" style="justify-content: flex-start; margin-bottom: 3rem;">
                <span class="badge">Google Cloud (GCP)</span>
                <span class="badge">Azure</span>
                <span class="badge">AWS</span>
                <span class="badge">Terraform</span>
                <span class="badge">Kubernetes</span>
                <span class="badge">Docker</span>
                <span class="badge">GitHub Actions</span>
                <span class="badge">Tailscale</span>
                <span class="badge">Python</span>
            </div>

            <p style="line-height: 1.8; font-size: 1.2rem; margin-bottom: 2rem; color: var(--md-sys-color-on-background); font-weight: 300;">
                Rather than repeating my resume, here are a few key highlights of my technical achievements:
            </p>

            <div class="grid" style="margin-bottom: 3rem;">
                <div class="card" style="padding: 2rem; cursor: default; justify-content: flex-start;">
                    <div class="card-header" style="margin-bottom: 1rem;">
                        <div class="card-icon" style="width: 48px; height: 48px;"><span class="material-symbols-rounded" style="font-size: 1.5rem;">lock</span></div>
                        <h3 style="font-size: 1.2rem; font-weight: 600; margin: 0;">Zero-Trust Architecture</h3>
                    </div>
                    <ul style="line-height: 1.6; font-size: 1.05rem; color: var(--md-sys-color-on-background); margin: 0; padding-left: 1.5rem; font-weight: 300;">
                        <li style="margin-bottom: 0.5rem;"><strong>GCP PAM &amp; Tailscale:</strong> Transitioned legacy VPNs to encrypted, identity-aware networks via Terraform.</li>
                        <li><strong>Infrastructure Hardening:</strong> Secured hybrid networking for a 1,500-person global workforce.</li>
                    </ul>
                </div>

                <div class="card" style="padding: 2rem; cursor: default; justify-content: flex-start;">
                    <div class="card-header" style="margin-bottom: 1rem;">
                        <div class="card-icon" style="width: 48px; height: 48px;"><span class="material-symbols-rounded" style="font-size: 1.5rem;">policy</span></div>
                        <h3 style="font-size: 1.2rem; font-weight: 600; margin: 0;">Enterprise Compliance</h3>
                    </div>
                    <ul style="line-height: 1.6; font-size: 1.05rem; color: var(--md-sys-color-on-background); margin: 0; padding-left: 1.5rem; font-weight: 300;">
                        <li style="margin-bottom: 0.5rem;"><strong>ISO 27001 &amp; SOC 2:</strong> Led Surveillance Audits achieving re-certification with zero major non-conformities.</li>
                        <li><strong>Automated TPRM:</strong> Engineered LLMs to auto-answer vendor questionnaires, saving days of work.</li>
                    </ul>
                </div>

                <div class="card" style="padding: 2rem; cursor: default; justify-content: flex-start;">
                    <div class="card-header" style="margin-bottom: 1rem;">
                        <div class="card-icon" style="width: 48px; height: 48px;"><span class="material-symbols-rounded" style="font-size: 1.5rem;">security</span></div>
                        <h3 style="font-size: 1.2rem; font-weight: 600; margin: 0;">DevSecOps</h3>
                    </div>
                    <ul style="line-height: 1.6; font-size: 1.05rem; color: var(--md-sys-color-on-background); margin: 0; padding-left: 1.5rem; font-weight: 300;">
                        <li style="margin-bottom: 0.5rem;"><strong>Vulnerability Mgmt:</strong> Executed automated audits across 524+ code repositories.</li>
                        <li><strong>CI/CD Pipelines:</strong> Integrated code review &amp; scanning gates into GitHub Actions to block CVEs.</li>
                    </ul>
                </div>
            </div>
            
            <div style="line-height: 1.8; font-size: 1.2rem; color: var(--md-sys-color-on-background); position: relative;">
                Sincerely,<br>
                <strong style="font-size: 1.4rem; color: var(--md-sys-color-primary); display: inline-block; margin-top: 0.5rem;">Chinmay Dhok</strong><br>
            </div>
        </div>
    </main>
"""

new_content = before_main + new_main + after_main

with open('cover-letter.html', 'w') as f:
    f.write(new_content)

print("Cover letter updated successfully")
