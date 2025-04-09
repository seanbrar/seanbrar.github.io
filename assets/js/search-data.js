// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Applied AI systems for information retrieval, research discovery, and knowledge enhancement.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-research",
          title: "research",
          description: "Academic papers, presentations, and technical proposals.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-library",
          title: "library",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-the-echo-in-the-cave",
        
          title: "The Echo in the Cave",
        
        description: "What remains when we leave?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/the-echo-in-the-cave/";
          
        },
      },{id: "post-great-expectations",
        
          title: "Great Expectations",
        
        description: "Thoughts on the release of OpenAI&#39;s new o1 models",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/great-expectations/";
          
        },
      },{id: "post-paperweight-research-tailored-to-you",
        
          title: "paperweight - Research Tailored to You",
        
        description: "Let paperweight push the latest papers to you.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/paperweight/";
          
        },
      },{id: "post-hello-world",
        
          title: "Hello, World",
        
        description: "Full speed ahead",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/hello-world/";
          
        },
      },{id: "books-basic-mathematics",
          title: 'Basic Mathematics',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/basic_mathematics_lang/";
            },},{id: "books-business-data-networks-and-security",
          title: 'Business Data Networks and Security',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/business_data_networks_panko/";
            },},{id: "books-calculus-early-transcendentals",
          title: 'Calculus: Early Transcendentals',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/calculus_briggs/";
            },},{id: "books-calculus",
          title: 'Calculus',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/calculus_spivak/";
            },},{id: "books-co-intelligence",
          title: 'Co-Intelligence',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/co_intelligence_mollick/";
            },},{id: "books-digital-forensics-investigation-and-response",
          title: 'Digital Forensics, Investigation, and Response',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/digital_forensics_easttom/";
            },},{id: "books-discrete-mathematics-with-applications",
          title: 'Discrete Mathematics with Applications',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/discrete_math_epp/";
            },},{id: "books-elementary-analysis-the-theory-of-calculus",
          title: 'Elementary Analysis: The Theory of Calculus',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/elementary_analysis_ross/";
            },},{id: "books-a-first-course-in-probability",
          title: 'A First Course in Probability',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/first_course_probability_ross/";
            },},{id: "books-the-forgetting-machine",
          title: 'The Forgetting Machine',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/forgetting_machine_quiroga/";
            },},{id: "books-foundations-of-machine-learning",
          title: 'Foundations of Machine Learning',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/foundations_ml/";
            },},{id: "books-geometry",
          title: 'Geometry',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/geometry_lang_murrow/";
            },},{id: "books-guns-germs-and-steel",
          title: 'Guns, Germs, and Steel',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/guns_germs_steel_diamond/";
            },},{id: "books-the-hidden-girl-and-other-stories",
          title: 'The Hidden Girl and Other Stories',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/hidden_girl_liu/";
            },},{id: "books-how-to-prove-it",
          title: 'How to Prove It',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/how_to_prove_it_velleman/";
            },},{id: "books-inspiring-walt-disney",
          title: 'Inspiring Walt Disney',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/inspiring_walt_disney/";
            },},{id: "books-introduction-to-algorithms",
          title: 'Introduction to Algorithms',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/intro_algorithms_clrs/";
            },},{id: "books-the-last-unicorn",
          title: 'The Last Unicorn',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/last_unicorn_beagle/";
            },},{id: "books-the-lies-of-locke-lamora",
          title: 'The Lies of Locke Lamora',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/lies_locke_lamora_lynch/";
            },},{id: "books-linear-algebra",
          title: 'Linear Algebra',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/linear_algebra_friedberg/";
            },},{id: "books-microservices-patterns",
          title: 'Microservices Patterns',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/microservices_patterns/";
            },},{id: "books-on-liberty",
          title: 'On Liberty',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/on_liberty_mill/";
            },},{id: "books-peter-and-the-shadow-thieves",
          title: 'Peter and the Shadow Thieves',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/peter_shadow_thieves/";
            },},{id: "books-precalculus",
          title: 'Precalculus',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/precalculus_stewart/";
            },},{id: "books-prodigal-genius",
          title: 'Prodigal Genius',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/prodigal_genius_oneil/";
            },},{id: "books-progress-and-poverty",
          title: 'Progress and Poverty',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/progress_poverty_george/";
            },},{id: "books-proofs",
          title: 'Proofs',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/proofs_cummings/";
            },},{id: "books-steve-jobs",
          title: 'Steve Jobs',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/steve_jobs_isaacson/";
            },},{id: "books-superintelligence",
          title: 'Superintelligence',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/superintelligence_bostrom/";
            },},{id: "books-a-synopsis-of-elementary-results-in-pure-and-applied-mathematics",
          title: 'A Synopsis of Elementary Results in Pure and Applied Mathematics',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/synopsis_elementary_results_vol1_carr/";
            },},{id: "books-team-of-rivals",
          title: 'Team of Rivals',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/team_of_rivals_goodwin/";
            },},{id: "books-tempo",
          title: 'Tempo',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/tempo_rao/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "books-thinking-fast-and-slow",
          title: 'Thinking, Fast and Slow',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/thinking_fast_slow_kahneman/";
            },},{id: "books-the-visual-display-of-quantitative-information",
          title: 'The Visual Display of Quantitative Information',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/visual_display_tufte/";
            },},{id: "projects-contextrag",
          title: 'ContextRAG',
          description: "A scalable vector database system for semantic search with context-aware processing",
          section: "Projects",handler: () => {
              window.location.href = "/projects/contextrag/";
            },},{id: "projects-paperweight",
          title: 'paperweight',
          description: "Personalized research discovery system through intelligent filtering and summarization",
          section: "Projects",handler: () => {
              window.location.href = "/projects/paperweight/";
            },},{id: "projects-prickly-pairs",
          title: 'Prickly Pairs',
          description: "AI-powered flashcard generation system with context-enriched answers",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pricklypairs/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%65%6C%6C%6F@%73%65%61%6E%62%72%61%72.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/seanbrar", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/seanbrar", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/seanbrar_", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
