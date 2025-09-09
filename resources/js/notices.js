// 공지사항 로드 라이브러리
class NoticeManager {
    constructor() {
        this.notices = [];
        this.repoOwner = 'mabujangpcs-cpu'; // GitHub 사용자명
        this.repoName = 'mabujangpcs-cpu.github.io'; // 저장소명
    }

    // GitHub API에서 공지사항 불러오기
    async loadNotices() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/_notices`);
            
            if (!response.ok) {
                throw new Error('공지사항을 불러올 수 없습니다.');
            }
            
            const files = await response.json();
            const markdownFiles = files.filter(file => file.name.endsWith('.md'));
            
            const noticePromises = markdownFiles.map(async (file) => {
                const fileResponse = await fetch(file.download_url);
                const content = await fileResponse.text();
                
                const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
                
                if (frontMatterMatch) {
                    const frontMatter = frontMatterMatch[1];
                    const body = frontMatterMatch[2];
                    
                    const notice = {
                        id: file.name.replace('.md', ''),
                        content: body.trim(),
                        published: false // 기본값
                    };
                    
                    // Front matter 파싱
                    const lines = frontMatter.split('\n');
                    lines.forEach(line => {
                        const [key, ...valueParts] = line.split(':');
                        if (key && valueParts.length > 0) {
                            let value = valueParts.join(':').trim();
                            value = value.replace(/^["']|["']$/g, '');
                            
                            // boolean 값 처리
                            if (value.toLowerCase() === 'true') {
                                notice[key.trim()] = true;
                            } else if (value.toLowerCase() === 'false') {
                                notice[key.trim()] = false;
                            } else {
                                notice[key.trim()] = value;
                            }
                        }
                    });
                    
                    return notice;
                }
                return null;
            });
            
            this.notices = (await Promise.all(noticePromises))
                .filter(notice => notice !== null && notice.published === true)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
                
            return this.notices;
            
        } catch (error) {
            console.error('공지사항 로드 실패:', error);
            return [];
        }
    }

    // 최신 공지사항 가져오기
    getRecentNotices(limit = 3) {
        return this.notices.slice(0, limit);
    }

    // 날짜 포맷팅
    formatDate(dateString) {
        if (!dateString) return '날짜 미상';
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    // HTML 생성 - 메인페이지용 (간단한 미리보기)
    generateMainHTML(notices) {
        if (!notices || notices.length === 0) {
            return `
                <div class="empty-notices">
                    <p>등록된 공지사항이 없습니다.</p>
                </div>
            `;
        }

        return notices.map(notice => `
            <div class="notice-preview-item">
                <h3 class="notice-title">
                    <a href="guide.html#notice-${notice.id}">${notice.title || '제목 없음'}</a>
                </h3>
                <div class="notice-meta">
                    <span class="notice-date">${this.formatDate(notice.date)}</span>
                    <span class="notice-author">${notice.author || '관리자'}</span>
                </div>
                ${notice.summary ? `<p class="notice-summary">${notice.summary}</p>` : ''}
            </div>
        `).join('');
    }

    // HTML 생성 - 가이드페이지용 (전체 목록)
    generateGuideHTML(notices) {
        if (!notices || notices.length === 0) {
            return `
                <div class="empty-notices">
                    <p>등록된 공지사항이 없습니다.</p>
                </div>
            `;
        }

        return notices.map(notice => `
            <a href="javascript:void(0);" class="col" onclick="openNoticeModal('${notice.id}')">
                <div class="cardset cardset-hover cardset-border cardset-round">
                    <div class="cardset-cont">
                        <h2 class="h6 cardset-tit">${notice.title || '제목 없음'}</h2>
                        <p class="p1 cardset-desc">
                            ${notice.summary || notice.content.substring(0, 100) + '...'}
                        </p>
                        <span class="p2 cardset-txt">${this.formatDate(notice.date)}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }
}

// 전역 변수
window.noticeManager = new NoticeManager();
window.currentNotices = [];

// 공지사항 모달 열기 함수
function openNoticeModal(noticeId) {
    const notice = window.currentNotices.find(n => n.id === noticeId);
    if (!notice) return;

    // 모달이 없다면 생성
    let modal = document.getElementById('noticeModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'noticeModal';
        modal.className = 'notice-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeNoticeModal()">&times;</span>
                <div class="modal-body">
                    <h1 id="modalTitle"></h1>
                    <div class="modal-meta">
                        <span id="modalDate"></span>
                        <span id="modalAuthor"></span>
                    </div>
                    <div id="modalContent"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // 모달 내용 업데이트
    document.getElementById('modalTitle').textContent = notice.title;
    document.getElementById('modalDate').textContent = window.noticeManager.formatDate(notice.date);
    document.getElementById('modalAuthor').textContent = notice.author || '관리자';
    document.getElementById('modalContent').innerHTML = notice.content.replace(/\n/g, '<br>');

    // 모달 표시
    modal.style.display = 'block';
}

// 공지사항 모달 닫기 함수
function closeNoticeModal() {
    const modal = document.getElementById('noticeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 모달 외부 클릭시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('noticeModal');
    if (event.target === modal) {
        closeNoticeModal();
    }
}