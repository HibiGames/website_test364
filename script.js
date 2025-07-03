class HelloFlow {
    constructor() {
        this.container = document.getElementById('container');
        this.colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
        this.sizes = ['size-small', 'size-medium', 'size-large', 'size-xlarge'];
        this.isRunning = true;
        this.init();
    }

    init() {
        // 初期のhelloテキストを生成
        this.createMultipleHellos();
        
        // 定期的に新しいhelloテキストを生成
        this.startAnimation();
        
        // クリックで一時停止/再開
        document.addEventListener('click', () => {
            this.toggleAnimation();
        });
    }

    createHelloElement() {
        const hello = document.createElement('div');
        hello.className = 'hello-text';
        hello.textContent = 'hello';
        
        // ランダムな色とサイズを適用
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        const randomSize = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        hello.classList.add(randomColor, randomSize);
        
        // ランダムな開始位置（左上の範囲）
        const startX = Math.random() * 200 - 100; // -100px から 100px
        const startY = Math.random() * 200 - 100; // -100px から 100px
        hello.style.left = startX + 'px';
        hello.style.top = startY + 'px';
        
        // ランダムなアニメーション遅延
        const delay = Math.random() * 2;
        hello.style.animationDelay = delay + 's';
        
        // ランダムなアニメーション継続時間
        const duration = 6 + Math.random() * 4; // 6-10秒
        hello.style.animationDuration = duration + 's';
        
        return hello;
    }

    createMultipleHellos() {
        // 初期に複数のhelloを生成
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                if (this.isRunning) {
                    const hello = this.createHelloElement();
                    this.container.appendChild(hello);
                    
                    // アニメーション終了後に要素を削除
                    hello.addEventListener('animationend', () => {
                        if (hello.parentNode) {
                            hello.parentNode.removeChild(hello);
                        }
                    });
                }
            }, i * 500); // 0.5秒間隔
        }
    }

    startAnimation() {
        this.animationInterval = setInterval(() => {
            if (this.isRunning) {
                const hello = this.createHelloElement();
                this.container.appendChild(hello);
                
                // アニメーション終了後に要素を削除
                hello.addEventListener('animationend', () => {
                    if (hello.parentNode) {
                        hello.parentNode.removeChild(hello);
                    }
                });
            }
        }, 800); // 0.8秒間隔で新しいhelloを生成
    }

    toggleAnimation() {
        this.isRunning = !this.isRunning;
        
        if (this.isRunning) {
            // 再開時に新しいhelloを生成
            this.createMultipleHellos();
        }
    }

    stopAnimation() {
        this.isRunning = false;
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

// DOMが読み込まれたらアニメーションを開始
document.addEventListener('DOMContentLoaded', () => {
    new HelloFlow();
});

// ページが非表示になったらアニメーションを停止（パフォーマンス向上）
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // ページが非表示の時は一時停止
    } else {
        // ページが表示された時は再開
    }
});
