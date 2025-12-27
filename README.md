# Zulqarnain Ali - Portfolio

A stunning 3D interactive portfolio website showcasing the work of Zulqarnain Ali, a Machine Learning Engineer & AI Researcher.

![Portfolio Preview](./preview.png)

## 🌟 Features

- **Immersive 3D Background** - Interactive neural network visualization using Three.js
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Fully Responsive** - Optimized for all devices and screen sizes
- **Dark Theme** - Professional dark design with electric purple and cyan accents
- **Interactive Sections**:
  - Hero with profile picture and animated introduction
  - About section with education and volunteer experience
  - Timeline-based experience section
  - Skills showcase with tech icons
  - Projects gallery with GitHub links
  - Research publications section
  - Awards and certifications display
  - Contact form with mentorship booking via Topmate

## 🎨 Color Psychology & Theme

The portfolio uses a carefully selected color palette designed to convey professionalism, innovation, and trust:

### Primary Colors
- **Deep Navy (#050816)** - Primary background color representing depth, professionalism, and trust
- **Electric Purple (#915eff)** - Primary accent representing creativity, innovation, and wisdom
- **Neon Cyan (#00d8ff)** - Secondary accent representing technology, modern AI, and data

### Color Psychology in Tech
The purple-cyan color combination is particularly effective for AI/ML portfolios because:
- **Purple** evokes wisdom, creativity, and technical excellence
- **Cyan** represents cutting-edge technology and innovation
- **Dark backgrounds** reduce eye strain and make content pop
- **High contrast** ensures readability and accessibility

### Typography
- **Space Grotesk** - Futuristic heading font for tech feel
- **Inter** - Clean, readable body font for content

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + DevIcons
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zulqarnainalipk/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_emailjs_public_key
```

### Adding Your Profile Photo

1. Add your photo to `public/assets/profile.jpg`
2. Update the Hero component to use your photo:
   ```tsx
   <img src="/assets/profile.jpg" alt="Zulqarnain Ali" />
   ```

### Customizing Content

All portfolio data is centralized in `constants/index.ts`. Edit this file to:
- Update work experience
- Modify project details
- Change research papers
- Update contact information
- Add new skills or certifications

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── canvas/          # 3D components (Three.js)
│   │   ├── Stars.tsx
│   │   ├── NeuralNetwork.tsx
│   │   └── DataSphere.tsx
│   ├── ui/              # UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Research.tsx
│   │   ├── Awards.tsx
│   │   └── Contact.tsx
│   └── Loader.tsx       # Loading screen
├── constants/
│   └── index.ts         # All portfolio data
├── public/
│   └── assets/          # Static assets
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## 🌐 Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Settings**
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`

4. **Deploy**
   - Click "Deploy" and wait for the build to complete

5. **Custom Domain (Optional)**
   - Go to Settings > Domains
   - Add your custom domain
   - Configure DNS records

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Simplified 3D elements for better performance
- Collapsible navigation menu
- Touch-friendly interactive elements
- Optimized typography for readability

## ⚡ Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **3D Model Optimization**: Compressed geometries
- **Lazy Loading**: Suspense for 3D components
- **Image Optimization**: Next.js Image component

## 🔧 Customization Guide

### Changing the 3D Background

Edit `components/canvas/` files to customize:
- Star particles count and behavior
- Neural network node count
- Data sphere effects

### Modifying Colors

Update `tailwind.config.js`:
```js
colors: {
  primary: '#050816',      // Background
  secondary: '#aaa6c3',    // Secondary text
  accent: '#915eff',       // Primary accent
  'accent-secondary': '#00d8ff',  // Secondary accent
}
```

### Adding New Sections

1. Create component in `components/ui/`
2. Add to `app/page.tsx`
3. Update navigation in `constants/index.ts`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: zulqarnain445ali@gmail.com
- **LinkedIn**: [linkedin.com/in/zulqarnainalipk](https://linkedin.com/in/zulqarnainalipk)
- **GitHub**: [github.com/zulqarnainalipk](https://github.com/zulqarnainalipk)
- **Topmate**: [topmate.io/zulqarnainalipk](https://topmate.io/zulqarnainalipk)

---

Built with ❤️ using Next.js, Three.js, and Tailwind CSS


---

## 🚀 Quick Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   cd zulqarnain-portfolio
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/zulqarnainalipk/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Click **"Import"** on your portfolio repository
   - Vercel will automatically detect Next.js settings:
     - Framework Preset: **Next.js**
     - Build Command: `next build`
     - Output Directory: `.next`
   - Click **"Deploy"**
   - Wait 1-2 minutes for deployment

3. **Custom Domain (Optional)**
   - Go to **Settings > Domains**
   - Add your domain (e.g., `zulqarnain.dev`)
   - Follow DNS instructions

### Option 2: Deploy using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   cd zulqarnain-portfolio
   vercel login
   vercel --prod
   ```

### Option 3: Deploy using Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Click the button above and follow the prompts.

## ✅ Post-Deployment Checklist

After your site is live, complete these final steps:

- [ ] **Replace Profile Photo**: Add your photo to `public/assets/profile.jpg`
- [ ] **Update CV**: Replace `public/assets/Zulqarnain_CV.pdf` with your latest CV
- [ ] **Topmate URL**: Update the Topmate link in `components/ui/Contact.tsx`
- [ ] **Research DOIs**: Update DOIs in `constants/index.ts` for research papers
- [ ] **Test Contact Form**: Ensure email form works correctly
- [ ] **Check Mobile View**: Test on mobile devices
- [ ] **Verify Links**: Test all social links and project links

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Deployment Failed
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript errors are resolved locally

### 3D Elements Not Loading
- Check browser console for WebGL errors
- Ensure modern browser (Chrome, Firefox, Safari)
- Disable ad blockers that may block canvas

## 📝 Environment Variables

If using contact form with EmailJS, create `.env.local`:
```env
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_public_key
```

## 🌐 Your Portfolio URL

Once deployed, your portfolio will be available at:
- **Production**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://your-domain.com`

Share this URL with:
- Recruiters and hiring managers
- LinkedIn profile
- Email signature
- Conference speakers

## 📊 SEO Optimization

The portfolio includes:
- Open Graph tags for social sharing
- Twitter card meta tags
- Semantic HTML structure
- Fast loading times
- Mobile-responsive design

## 🎉 Next Steps

1. **Customize Content**: Update `constants/index.ts` with your latest info
2. **Add Analytics**: Add Google Analytics in `app/layout.tsx`
3. **Enable HTTPS**: Automatic with Vercel
4. **Monitor Performance**: Use Vercel Analytics

---

**🎯 Your 3D portfolio is ready to go live!**