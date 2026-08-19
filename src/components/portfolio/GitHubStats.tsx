export default function GitHubStats() {
  return (
    <section className="py-24 md:py-32" style={{ background: "#0d1117" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div>
          <span className="section-label">
            <i className="fab fa-github" aria-hidden="true" /> GITHUB STATS
          </span>
          <h2
            className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 section-heading"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Open source{" "}
            <span className="gradient-text">contributions</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 scroll-reveal stagger-1">
          {/* GitHub Stats Card */}
          <div className="glass-card p-4 overflow-hidden">
            <img
              src="https://github-readme-stats.vercel.app/api?username=harisprocoder&show_icons=true&theme=radical&hide_border=true&bg_color=111827&title_color=6366f1&text_color=f1f5f9&icon_color=06b6d4"
              alt="GitHub Stats for harisprocoder"
              loading="lazy"
              decoding="async"
              width="495"
              height="195"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Top Languages */}
          <div className="glass-card p-4 overflow-hidden">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=harisprocoder&layout=compact&theme=radical&hide_border=true&bg_color=111827&title_color=6366f1&text_color=f1f5f9"
              alt="Top Languages for harisprocoder"
              loading="lazy"
              decoding="async"
              width="495"
              height="195"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* GitHub Streak */}
        <div className="glass-card p-4 overflow-hidden mt-6 max-w-xl mx-auto scroll-reveal stagger-2">
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=harisprocoder&theme=radical&hide_border=true&background=111827&stroke=6366f1&ring=06b6d4&fire=6366f1&currStreakLabel=f1f5f9&sideLabels=f1f5f9&currStreakNum=f1f5f9&sideNums=94a3b8&dates=475569"
            alt="GitHub Streak for harisprocoder"
            loading="lazy"
            decoding="async"
            width="700"
            height="200"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* GitHub contribution graph */}
        <div className="glass-card p-4 overflow-hidden mt-6 scroll-reveal stagger-3">
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=harisprocoder&bg_color=111827&color=6366f1&line=06b6d4&point=f1f5f9&area_color=6366f1&area=true&hide_border=true&custom_title=GitHub%20Activity"
            alt="GitHub Activity Graph for harisprocoder"
            loading="lazy"
            decoding="async"
            width="900"
            height="300"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
