// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('自己紹介サイトが読み込まれました');
    
    // ハンバーガーメニューの設定
    setupHamburgerMenu();
    
    // スキルバーのアニメーション
    animateSkillBars();
    
    // スムーススクロール
    setupSmoothScroll();
    
    // フォームの送信処理
    setupContactForm();
    
    // スクロール時のナビゲーション効果
    setupScrollEffects();
});

// ハンバーガーメニューの設定
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navList) {
        // ハンバーガーボタンのクリック処理
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
            
            // ボディのスクロールを制御
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // ナビゲーションリンクがクリックされたときにメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // メニューを閉じる（モバイルの場合）
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// スキルバーのアニメーション
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.width = skillLevel + '%';
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// スムーススクロール
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // ハッシュリンク（#で始まるリンク）の場合のみスムーススクロール処理
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // 外部リンクや他のHTMLファイルへのリンクはそのまま通す
        });
    });
}

// コンタクトフォームの処理
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // フォームバリデーション
            if (validateForm(formData)) {
                // ここで実際の送信処理を行う（例：API呼び出し）
                console.log('フォームデータ:', formData);
                showMessage('メッセージを送信しました！', 'success');
                contactForm.reset();
            }
        });
    }
}

// フォームバリデーション
function validateForm(data) {
    if (!data.name.trim()) {
        showMessage('お名前を入力してください', 'error');
        return false;
    }
    
    if (!data.email.trim()) {
        showMessage('メールアドレスを入力してください', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showMessage('有効なメールアドレスを入力してください', 'error');
        return false;
    }
    
    if (!data.message.trim()) {
        showMessage('メッセージを入力してください', 'error');
        return false;
    }
    
    return true;
}

// メールアドレスの形式チェック
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// メッセージ表示
function showMessage(message, type) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // スタイルを追加
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 4px;
        text-align: center;
        font-weight: bold;
        ${type === 'success' ? 
            'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    const form = document.getElementById('contactForm');
    form.appendChild(messageDiv);
    
    // 3秒後にメッセージを削除
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// スクロール効果
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // ヘッダーの透明度調整
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // カードの表示アニメーション
    const cards = document.querySelectorAll('.hobby-card, .skill-item');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// ページの先頭に戻るボタン（オプション）
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// ページの先頭に戻るボタンを作成
createBackToTopButton();