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
    
    if (!fs.existsSync(noticesDir)) {
        console.error(`❌ ${noticesDir} 폴더가 없습니다!`);
        return;
    }
    
    const template = fs.readFileSync(templatePath, 'utf8');
    const files = fs.readdirSync(noticesDir).filter(f => f.endsWith('.md'));
    
    console.log(`📁 발견된 마크다운 파일: ${files.length}개`);
    
    files.forEach(file => {
        console.log(`\n처리 중: ${file}`);
        const content = fs.readFileSync(path.join(noticesDir, file), 'utf8');
        
        // Front matter와 본문 분리
        let frontMatter = {};
        let body = content;
        
        if (content.startsWith('---')) {
            const parts = content.split('---');
            if (parts.length >= 3) {
                const frontMatterText = parts[1];
                body = parts.slice(2).join('---').trim();
                
                // Front matter 파싱
                frontMatterText.split('\n').forEach(line => {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length > 0) {
                        const value = valueParts.join(':').trim().replace(/['"]/g, '');
                        frontMatter[key.trim()] = value;
                    }
                });
            }
        }
        
        // 기본값 설정
        const metadata = {
            title: frontMatter.title || '제목 없음',
            date: frontMatter.date || '2025-09-09',
            author: frontMatter.author || '관리자',
            summary: frontMatter.summary || frontMatter.description || '공지사항입니다'
        };
        
        // 파일명에서 ID 추출 (확장자 제거)
        const fileId = path.basename(file, '.md');
        
        console.log(`📄 제목: ${metadata.title}`);
        console.log(`📅 날짜: ${metadata.date}`);
        
        // HTML 생성
        let html = template;
        const replacements = {
            '{{NOTICE_TITLE}}': metadata.title,
            '{{NOTICE_SUMMARY}}': metadata.summary,
            '{{NOTICE_CONTENT_HTML}}': body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>'),
            '{{NOTICE_DATE}}': metadata.date,
            '{{NOTICE_DATE_FORMATTED}}': formatDate(metadata.date),
            '{{NOTICE_AUTHOR}}': metadata.author,
            '{{NOTICE_URL}}': `notice-${fileId}.html`
        };
        
        Object.keys(replacements).forEach(key => {
            html = html.split(key).join(replacements[key]);
        });
        
        // HTML 파일 저장
        const outputFileName = `notice-${fileId}.html`;
        fs.writeFileSync(outputFileName, html);
        console.log(`✅ 생성됨: ${outputFileName}`);
    });
    
    console.log('\n✨ 빌드 완료!');
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    } catch (e) {
        return dateString;
    }
}

buildNotices().catch(err => {
    console.error('에러:', err);
});