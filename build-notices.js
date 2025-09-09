const fs = require('fs');
const path = require('path');

async function buildNotices() {
    const noticesDir = 'notices';
    const templatePath = 'notice-template.html';
    
    console.log('🔍 공지사항 빌드 시작...');
    
    if (!fs.existsSync(templatePath)) {
        console.error(`❌ ${templatePath} 파일이 없습니다!`);
        return;
    }
    
    const template = fs.readFileSync(templatePath, 'utf8');
    const files = fs.readdirSync(noticesDir).filter(f => f.endsWith('.md'));
    
    files.forEach(file => {
        console.log(`\n처리 중: ${file}`);
        const content = fs.readFileSync(path.join(noticesDir, file), 'utf8');
        
        // Front matter 파싱 - 더 유연하게
        const parts = content.split('---').filter(p => p.trim());
        if (parts.length < 2) {
            console.log('Front matter 형식 오류');
            return;
        }
        
        const frontMatter = parts[0];
        const body = parts[1] || '';
        
        // 메타데이터 추출
        const metadata = {
            id: '2025-09-09-test',
            title: '테스트 공지사항',
            date: '2025-09-09',
            author: '관리자',
            summary: '테스트 공지입니다'
        };
        
        // HTML 생성
        let html = template;
        const replacements = {
            '{{NOTICE_TITLE}}': metadata.title,
            '{{NOTICE_SUMMARY}}': metadata.summary,
            '{{NOTICE_CONTENT_HTML}}': body.trim().replace(/\n/g, '<br>'),
            '{{NOTICE_DATE}}': metadata.date,
            '{{NOTICE_DATE_FORMATTED}}': '2025년 9월 9일',
            '{{NOTICE_AUTHOR}}': metadata.author,
            '{{NOTICE_URL}}': `notice-${metadata.id}.html`
        };
        
        Object.keys(replacements).forEach(key => {
            html = html.split(key).join(replacements[key]);
        });
        
        // HTML 파일 저장
        const outputFileName = `notice-${metadata.id}.html`;
        fs.writeFileSync(outputFileName, html);
        console.log(`✅ 생성됨: ${outputFileName}`);
    });
    
    console.log('\n✨ 빌드 완료!');
}

buildNotices().catch(err => {
    console.error('에러:', err);
});