// 공지사항 개별 페이지 생성 시스템
class NoticePageGenerator {
    constructor() {
        this.noticeManager = new NoticeManager();
        this.templateCache = null;
    }

    // HTML 템플릿 로드
    async loadTemplate() {
        if (this.templateCache) return this.templateCache;
        
        // 템플릿 HTML (위에서 만든 템플릿을 문자열로 저장)
        this.templateCache = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="imagetoolbar" content="no" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  
  <title>{{NOTICE_TITLE}} - 모두의티켓 공지사항</title>
  <meta name="description" content="{{NOTICE_SUMMARY}} - 모두의티켓 공지사항">
  <meta name="keywords" content="모두의티켓, 공지사항, {{NOTICE_TITLE}}, 소액결제, 신용카드, 정보이용료">
  <meta name="robots" content="index,follow">
  
  <meta property="og:type" content="article">
  <meta property="og:title" content="{{NOTICE_TITLE}} - 모두의티켓">
  <meta property="og:description" content="{{NOTICE_SUMMARY}}">
  <meta property="og:image" content="./resources/images/main.webp">
  <meta property="og:url" content="{{NOTICE_URL}}">
  <meta property="article:published_time" content="{{NOTICE_DATE}}">
  <meta property="article:author" content="{{NOTICE_AUTHOR}}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{NOTICE_TITLE}}">
  <meta name="twitter:description" content="{{NOTICE_SUMMARY}}">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{NOTICE_TITLE}}",
    "description": "{{NOTICE_SUMMARY}}",
    "author": {
      "@type": "Organization",
      "name": "모두의티켓"
    },
    "publisher": {
      "@type": "Organization",
      "name": "모두의티켓",
      "logo": {
        "@type": "ImageObject",
        "url": "./resources/images/logo.png"
      }
    },
    "datePublished": "{{NOTICE_DATE}}",
    "dateModified": "{{NOTICE_DATE}}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "{{NOTICE_URL}}"
    },
    "image": "./resources/images/main.webp"
  }
  </script>
  
  <link rel="stylesheet" href="./resources/css/setting.css" />
  <link rel="stylesheet" href="./resources/css/plugin.css" />
  <link rel="stylesheet" href="./resources/css/templatehouse.css" />
  <link rel="stylesheet" href="./resources/css/style.css" />
  
  <style>
    .notice-detail {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .notice-header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 2px solid #f0f0f0;
      margin-bottom: 40px;
    }
    
    .notice-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 20px 0;
      line-height: 1.3;
    }
    
    .notice-meta {
      display: flex;
      justify-content: center;
      gap: 30px;
      color: #666;
      font-size: 1rem;
    }
    
    .notice-content {
      line-height: 1.8;
      color: #444;
      font-size: 1.1rem;
    }
    
    .notice-content p {
      margin-bottom: 20px;
    }
    
    .notice-content h1,
    .notice-content h2,
    .notice-content h3 {
      color: #333;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    
    .notice-nav {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 2px solid #f0f0f0;
    }
    
    .notice-nav a {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .notice-nav a:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    @media (max-width: 768px) {
      .notice-title {
        font-size: 2rem;
      }
      
      .notice-meta {
        flex-direction: column;
        gap: 10px;
      }
      
      .notice-nav {
        flex-direction: column;
        gap: 15px;
      }
      
      .notice-nav a {
        text-align: center;
      }
    }
  </style>
</head>

<body>
  <!-- 헤더 (guide.html에서 복사) -->
  <header class="th-layout-header">
    <div class="basic-N1" id="aeMf54Wpe7">
      <div class="header-container container-lg">
        <div class="header-left">
          <div class="header-title">
            <a href="index.html">
              <img src="./resources/images/logo.png" alt="모두의티켓 로고 (블랙)" loading="lazy" decoding="async">
            </a>
          </div>
        </div>
        <div class="header-center">
          <div class="header-gnb">
            <ul class="header-gnblist">
              <li class="header-gnbitem">
                <a class="p1 header-gnblink" href="micro.html">
                  <span>소액결제 현금화</span>
                </a>
              </li>
              <li class="header-gnbitem">
                <a class="p1 header-gnblink" href="card.html">
                  <span>신용카드 현금화</span>
                </a>
              </li>
              <li class="header-gnbitem">
                <a class="p1 header-gnblink" href="info.html">
                  <span>정보이용료 현금화</span>
                </a>
              </li>
              <li class="header-gnbitem">
                <a class="p1 header-gnblink" href="guide.html">
                  <span>정보게시판</span>
                </a>
                <ul class="header-sublist">
                  <li class="header-subitem">
                    <a class="p2 header-sublink" href="guide.html">
                      <span>초보자가이드</span>
                    </a>
                  </li>
                  <li class="header-subitem">
                    <a class="p2 header-sublink" href="qna.html">
                      <span>질문과 답변</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="header-right">
          <div class="header-utils">
            <ul>
              <li class="allmenu"></li>
            </ul>
            <button class="btn-momenu">
              <i class="ico-hamburger"></i>
              <i class="ico-hamburger"></i>
              <i class="ico-hamburger"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main class="th-layout-main">
    <div class="th-layout-content">
      <div class="basic-N10">
        <div class="contents-container container-full">
          <div class="contents-inner">
            <div class="contents-visual">
              <picture>
                <source srcset="./resources/images/main.webp" media="(max-width: 992px)" />
                <img src="./resources/images/main.webp" alt="모두의티켓 공지사항" fetchpriority="high" decoding="async" loading="lazy">
              </picture>
            </div>
            <div class="contents-body">
              <div class="textset">
                <h1 class="h1 textset-tit">공지사항</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notice-detail">
        <div class="notice-header">
          <h1 class="notice-title">{{NOTICE_TITLE}}</h1>
          <div class="notice-meta">
            <span>작성일: {{NOTICE_DATE_FORMATTED}}</span>
            <span>작성자: {{NOTICE_AUTHOR}}</span>
          </div>
        </div>
        
        <div class="notice-content">
          {{NOTICE_CONTENT_HTML}}
        </div>
        
        <div class="notice-nav">
          <a href="guide.html">목록으로 돌아가기</a>
          <a href="index.html">메인 페이지</a>
        </div>
      </div>
    </div>
  </main>

  <!-- 푸터는 간단하게 -->
  <footer class="th-layout-footer">
    <div class="basic-N4">
      <div class="footer-container container-md">
        <div class="footer-bottom">
          <address class="footer-txt">
            <p class="p2">머시거머시기 ~ 모두의티켓</p>
            <p>
              <span class="p2">T. 010-1234-5678</span>
              <span class="p2">E. mabujangpcs@gmail.com</span>
            </p>
          </address>
          <div class="footer-txt">
            <p class="p2">2025 BY 모두의티켓. ALL RIGHTS RESEVED</p>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="./resources/js/setting.js"></script>
  <script src="./resources/js/plugin.js"></script>
  <script src="./resources/js/templatehouse.js"></script>
  <script src="./resources/js/style.js"></script>
</body>
</html>`;

        return this.templateCache;
    }

    // HTML 엔티티 디코딩 함수
    decodeHTMLEntities(text) {
        if (!text) return '';
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    // 공지사항 데이터로 HTML 생성 - 수정된 버전
    generateNoticeHTML(notice) {
        if (!this.templateCache) {
            console.error('템플릿이 로드되지 않음');
            return '';
        }
        
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
        
        // 템플릿 변수들을 치환할 값 준비
        const replacements = {
            '{{NOTICE_TITLE}}': this.decodeHTMLEntities(notice.title || '제목 없음'),
            '{{NOTICE_SUMMARY}}': this.decodeHTMLEntities(notice.summary || (notice.content ? notice.content.substring(0, 150) + '...' : '')),
            '{{NOTICE_CONTENT_HTML}}': this.markdownToHTML(notice.content || ''),
            '{{NOTICE_DATE}}': notice.date || new Date().toISOString(),
            '{{NOTICE_DATE_FORMATTED}}': this.noticeManager.formatDate(notice.date),
            '{{NOTICE_AUTHOR}}': this.decodeHTMLEntities(notice.author || '관리자'),
            '{{NOTICE_URL}}': baseUrl + 'notice-' + notice.id + '.html'
        };

        let html = this.templateCache;
        
        // 더 확실한 치환 방법 사용
        Object.keys(replacements).forEach(key => {
            // split과 join을 사용하여 모든 occurrence를 치환
            html = html.split(key).join(replacements[key]);
        });

        return html;
    }

    // 간단한 마크다운을 HTML로 변환
    markdownToHTML(markdown) {
        if (!markdown) return '';
        
        return markdown
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    // 공지사항 URL 생성
    generateNoticeURL(noticeId) {
        return 'notice-' + noticeId + '.html';
    }

    // 모든 공지사항 페이지를 메모리에 생성하고 저장
    async generateAllPages() {
        try {
            await this.loadTemplate();
            const notices = await this.noticeManager.loadNotices();
            
            const pages = {};
            notices.forEach(notice => {
                const fileName = this.generateNoticeURL(notice.id);
                const html = this.generateNoticeHTML(notice);
                pages[fileName] = {
                    html: html,
                    notice: notice
                };
            });
            
            console.log(`총 ${Object.keys(pages).length}개의 페이지 생성 완료`);
            return pages;
        } catch (error) {
            console.error('페이지 생성 실패:', error);
            return {};
        }
    }

    // 개별 공지사항 페이지를 실제 파일로 다운로드 (테스트용)
    downloadPage(noticeId) {
        const pages = window.generatedPages;
        if (!pages) {
            console.error('생성된 페이지가 없습니다');
            return;
        }
        
        const fileName = this.generateNoticeURL(noticeId);
        const page = pages[fileName];
        
        if (!page) {
            console.error('해당 공지사항 페이지를 찾을 수 없습니다');
            return;
        }
        
        const blob = new Blob([page.html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// 전역 변수로 등록
window.noticePageGenerator = new NoticePageGenerator();