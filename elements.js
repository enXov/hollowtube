const ELEMENTS = [
    {
        id: "video_side_suggestions",
        label: "Video Side Suggestions",
        filters: [
            "youtube.com## #secondary #related"
        ],
        matchers: [
            "youtube.com## #secondary #related"
        ]
    },
    {
        id: "main_page_topics",
        label: "Main Page Topics",
        filters: [
            "www.youtube.com###chips-content",
            "www.youtube.com##.ytd-app.style-scope.with-chipbar",
            "www.youtube.com###header > .ytd-rich-grid-renderer.style-scope"
        ],
        matchers: [
            "www.youtube.com###chips-content",
            "www.youtube.com##.ytd-app.style-scope.with-chipbar",
            "www.youtube.com###header > .ytd-rich-grid-renderer.style-scope"
        ]
    },
    {
        id: "sidebar_more_from_youtube",
        label: "Sidebar: More from YouTube",
        filters: [
            "www.youtube.com##ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(5)"
        ],
        matchers: [
            "www.youtube.com##ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(5)"
        ]
    },
    {
        id: "sidebar_footer",
        label: "Sidebar: Footer",
        filters: [
            "www.youtube.com###footer"
        ],
        matchers: [
            "www.youtube.com###footer"
        ]
    },
    {
        id: "sidebar_explore",
        label: "Sidebar: Explore",
        filters: [
            "www.youtube.com##ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(4)"
        ],
        matchers: [
            "www.youtube.com##ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(4)"
        ]
    },
    {
        id: "sidebar_home_shorts",
        label: "Sidebar: Home and Shorts",
        filters: [
            "www.youtube.com##ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(1)"
        ],
        matchers: [
            "www.youtube.com##ytd-guide-section-renderer.ytd-guide-renderer.style-scope:nth-of-type(1)"
        ]
    },
    {
        id: "main_page_contents",
        label: "Main Page Contents",
        filters: [
            "www.youtube.com###contents"
        ],
        matchers: [
            "www.youtube.com###contents"
        ]
    },
    {
        id: "voice_search_button",
        label: "Voice Search Button",
        filters: [
            "www.youtube.com###voice-search-button"
        ],
        matchers: [
            "www.youtube.com###voice-search-button"
        ]
    },
    {
        id: "search_button_styling",
        label: "Search Button Styling",
        filters: [
            "www.youtube.com##.ytSearchboxComponentSearchButtonDark.ytSearchboxComponentSearchButton",
            "www.youtube.com##.ytSearchboxComponentInputBox:style(flex: 1 1 auto !important; border-radius: 40px !important; margin-right: 0 !important;)",
            "www.youtube.com##.ytSearchboxComponentSearchButton:style(display: none !important;)"
        ],
        matchers: [
            "www.youtube.com##.ytSearchboxComponentSearchButtonDark.ytSearchboxComponentSearchButton",
            "www.youtube.com##.ytSearchboxComponentInputBox:style(flex: 1 1 auto !important; border-radius: 40px !important; margin-right: 0 !important;)",
            "www.youtube.com##.ytSearchboxComponentSearchButton:style(display: none !important;)"
        ]
    },
    {
        id: "hide_mix_playlist",
        label: "Hide Mix/Playlist",
        filters: [
            "www.youtube.com##ytd-rich-item-renderer:has(a[href*=\"list=\"])",
            "www.youtube.com##ytd-grid-video-renderer:has(a[href*=\"list=\"])"
        ],
        matchers: [
            "www.youtube.com##ytd-rich-item-renderer:has(a[href*=\"list=\"])",
            "www.youtube.com##ytd-grid-video-renderer:has(a[href*=\"list=\"])"
        ]
    },
    {
        id: "main_page_shorts",
        label: "Main Page Shorts Block",
        filters: [
            "www.youtube.com##ytd-rich-section-renderer.ytd-rich-grid-renderer.style-scope"
        ],
        matchers: [
            "www.youtube.com##ytd-rich-section-renderer.ytd-rich-grid-renderer.style-scope"
        ]
    },
    {
        id: "hide_members_only",
        label: "Hide Members Only Videos",
        filters: [
            "youtube.com##ytd-rich-item-renderer:has(badge-shape.yt-badge-shape--commerce)"
        ],
        matchers: [
            "youtube.com##ytd-rich-item-renderer:has(badge-shape.yt-badge-shape--commerce)"
        ]
    }
];