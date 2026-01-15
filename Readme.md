**Production-Style CI/CD Pipeline using GitHub Actions, Docker, AWS ECR & EC2**
    
* This project demonstrates a real-world DevOps CI/CD workflow where a full-stack application is containerized, pushed to   AWS ECR, and automatically deployed on an EC2 instance using GitHub Actions.

* The setup is Free-Tier optimized and focuses on core DevOps fundamentals rather than managed Kubernetes services.

# Tech Stack
    CLOUD: AWS EC2 (Free Tier), AWS ECR, AWS IAM
    DEVOPS: Docker, GitHub Actions, Terraform (for EC2 creation), Postman(for API test)
    APP: Backend: Node.js + Express
         Frontend: Static build served via Nginx Vite(React)
         Database: MongoDB Atlas (Cloud DB)

# Infrastructure as a code (Terraform)
    Created Ubuntu EC2 instance (Free Tier eligible)
    Attached IAM Role with ECR permissions
    Opened ports:
        80 → Frontend (Nginx)
        3000 → Backend API
        22 → SSH

# Dockerization
    Backend: Node.js API container
            Environment variables injected at runtime (Mongo_URL)
            Connects to MongoDB Atlas (by giving access to public IP4 of EC2)
            Served on port 3000
    Frontend: Frontend build copied into Nginx image
            No Node.js required at runtime
            Served on port 80

# CI/CD Pipeline (GitHub Actions)
Trigger:
    Push to main branch
Pipeline Steps:
    Checkout source code
    Configure AWS credentials
    Login to AWS ECR
    Build Docker images
    Push images to ECR
    SSH into EC2
    Pull latest images
    Stop old containers
    Run updated containers (restart if fail)

# In this project i demonstrates
CI/CD (gitAction)
Docker
Cloud (aws)
IAM
Infrastructure as Code (terraform)
Free-tier optimized

# Future Improvements
Add Nginx reverse proxy for /api
Add HTTPS using Let's Encrypt
Introduce Blue-Green deployment
Migrate to ECS or EKS
Add monitoring with Prometheus & Grafana