# Chinmay Dhok - Personal Portfolio

This repository contains the source code for my personal portfolio and professional playbook, hosted securely via **Cloudflare Pages**.

## 🏗️ Architecture & Deployment
- **Hosting**: Cloudflare Pages
- **DNS/URL**: `chinmaydhok.pages.dev`
- **Security**: Achieves an **A+** security rating on SecurityHeaders.com via a custom `_headers` configuration file that natively injects CSP, X-Frame-Options, Referrer-Policy, and other strict HTTP response headers.

## 📁 Repository Structure
This repository serves as a monorepo for my portfolio assets:
- `/index.html` - The main portfolio landing page.
- `/playbook/` - Contains the "AI Strategy & Value Playbook" sub-site (previously a separate repository, now merged for streamlined deployment).
- `/_headers` - Cloudflare Pages configuration for strict security headers.

## 🚀 How to Deploy
Deployments are entirely automated. Any code pushed to the `main` branch of this repository automatically triggers a fast build and deployment on Cloudflare Pages.
