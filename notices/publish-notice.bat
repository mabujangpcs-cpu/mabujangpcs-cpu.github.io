@echo off
chcp 65001 >nul
title 공지사항 업로드 도구

echo ===============================================
echo           공지사항 자동 업로드 도구
echo ===============================================
echo.

echo [1/4] 프로젝트 폴더로 이동 중...
cd /d "C:\Users\user\Desktop\mabujangpcs-cpu.github.io"
echo ✅ 현재 위치: %cd%
echo.
echo 📁 build-notices.js 파일 확인 중...
if not exist "build-notices.js" (
    echo ❌ build-notices.js 파일이 없습니다!
    pause
    exit /b 1
)
echo ✅ build-notices.js 파일 발견
echo.

echo [2/4] HTML 파일 생성 중...
node build-notices.js
if errorlevel 1 (
    echo ❌ HTML 생성 실패!
    pause
    exit /b 1
)
echo.

echo [3/4] GitHub에 업로드 중...
git add .
git commit -m "새 공지사항 업로드 - %date% %time%"
git push origin main
if errorlevel 1 (
    echo ❌ GitHub 업로드 실패!
    pause
    exit /b 1
)
echo.

echo [4/4] 완료!
echo ✅ 모든 작업이 성공적으로 완료되었습니다!
echo.
echo 웹사이트에서 확인해보세요:
echo https://mabujangpcs-cpu.github.io
echo.
echo 아무 키나 누르면 종료됩니다...
pause >nul