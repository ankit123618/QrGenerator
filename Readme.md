# QR Generator

`qr-generator` is a lightweight frontend application for generating QR codes from user-entered URLs. It is built with plain HTML, CSS, and JavaScript, and can be served directly as a static website or packaged with Docker and Kubernetes for deployment.

## Features

- Generate a QR code from a website URL.
- Automatically prepend `https://` when the protocol is missing.
- Download the generated QR code as a PNG image.
- Run locally as a static app without a backend.
- Package and deploy with Docker, Kubernetes, and GitHub Actions.

## Tech Stack

- HTML for the page structure
- CSS for styling
- JavaScript for QR generation and download behavior
- [QRCode.js](https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js) for QR rendering
- Nginx for containerized static hosting
- Kubernetes manifests for deployment

## Project Structure

```text
qr-generator/
├── .github/
│   └── workflows/
│       └── flow.yml
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── script.js
│   └── index.html
├── .gitignore
├── Dockerfile
├── LICENCE
└── Readme.md
```

## Directory and File Guide

### Root Files

`Readme.md`
- Main project documentation.
- Explains the app, setup steps, deployment options, and repository structure.

`.gitignore`
- Git ignore configuration file.
- It is currently empty, so no local files are explicitly ignored by the repository.

`Dockerfile`
- Builds a container image using `nginx:alpine`.
- Copies the static files from `src/` into Nginx's default web root.
- Exposes port `80` and starts Nginx in the foreground.

`LICENCE`
- Contains the project's license text.
- Defines the terms under which the project can be used, modified, and shared.

### `.github/`

`.github/workflows/flow.yml`
- GitHub Actions workflow for building and pushing the Docker image.
- Runs on pushes to the `main` branch when relevant project files change.
- Logs in to Docker Hub, builds the image, and pushes the `latest` tag.

### `src/`

`src/`
- Contains the frontend application source files.
- This directory is copied into the Docker image and served as static content.

`src/index.html`
- Main entry page for the QR generator UI.
- Loads the stylesheet, input form, buttons, QR preview area, QRCode.js CDN script, and the local JavaScript logic.

### `src/assets/`

`src/assets/`
- Stores static frontend assets used by the app.
- Organized by asset type for styling and behavior.

`src/assets/css/style.css`
- Defines the visual styling of the page, container, input field, button, and QR output area.
- Uses a dark theme with red accents.

`src/assets/js/script.js`
- Contains the app logic for generating and downloading QR codes.
- Validates the input, normalizes URLs, renders the QR code, and enables the download button after generation.

### `k8s/`

`k8s/`
- Contains Kubernetes manifests for deploying the application.
- Includes one deployment and one service definition.

`k8s/deployment.yaml`
- Creates a Kubernetes `Deployment` named `qr-generator`.
- Runs 2 replicas of the container image `ankit123618/qr-generator:latest`.
- Exposes container port `80`.

`k8s/service.yaml`
- Creates a Kubernetes `Service` named `qr-generator-service`.
- Exposes the application through a `NodePort` on port `30007`.
- Routes traffic to pods labeled `app: qr-generator`.

## How It Works

1. The user enters a URL in the input field.
2. The JavaScript checks whether the URL is empty.
3. If the protocol is missing, the app adds `https://`.
4. `QRCode.js` renders the QR code inside the page.
5. Once the QR code canvas is available, the download button is shown.
6. The user can download the QR code as `watch-qr.png`.

## Run Locally

Because this is a static frontend project, you can open the app directly in a browser:

1. Clone the repository:

```bash
git clone https://github.com/ankit123618/qr-generator.git
cd qr-generator
```

2. Open [`src/index.html`](/var/www/html/qr-generator/src/index.html) in your browser.

If you prefer serving it through a local HTTP server, any static server will work.

## Run with Docker

Build the image locally:

```bash
docker build -t qr-generator .
```

Run the container:

```bash
docker run -d -p 8080:80 --name qr-generator qr-generator
```

Then open `http://localhost:8080`.

You can also use the published Docker image:

```bash
docker pull ankit123618/qr-generator:latest
docker run -d -p 8080:80 --name qr-generator ankit123618/qr-generator:latest
```

## Deploy with Kubernetes

Make sure your Kubernetes cluster is running and `kubectl` is configured, then apply the manifests:

```bash
kubectl apply -f k8s/
```

To access the app with Minikube:

```bash
minikube service qr-generator-service
```

This uses:

- [`k8s/deployment.yaml`](/var/www/html/qr-generator/k8s/deployment.yaml) to create the pods
- [`k8s/service.yaml`](/var/www/html/qr-generator/k8s/service.yaml) to expose the application

## CI/CD

The GitHub Actions workflow in [`.github/workflows/flow.yml`](/var/www/html/qr-generator/.github/workflows/flow.yml) automates Docker image publishing.

It currently:

- triggers on pushes to `main`
- rebuilds the Docker image when source, Kubernetes, Docker, or workflow files change
- tags the image as `latest` and with the Git commit SHA
- pushes the `latest` tag to Docker Hub

## License

The project license is provided in [`LICENCE`](/var/www/html/qr-generator/LICENCE).

## Notes

- The project currently depends on the QRCode.js CDN in [`src/index.html`](/var/www/html/qr-generator/src/index.html).
- No backend or database is required.
- The generated download filename is currently `watch-qr.png`.
