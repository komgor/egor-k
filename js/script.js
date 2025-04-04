document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню (если нужно)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Фильтрация новостей
    const filterButtons = document.querySelectorAll('.news-filters .btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Здесь должна быть логика фильтрации
            });
        });
    }
    
    // Обработка кнопок без функционала
    document.querySelectorAll('a[href="#"], button:not([type])').forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Эта функция находится в разработке');
            }
        });
    });
    document.querySelectorAll('.submit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showSuccessMessage('Ваша заявка успешно отправлена!');
        });
    });

    // Функция показа сообщения об успехе
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'success-message';
        alert.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }

    // Закрытие модальных окон
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
// Добавьте в конец файла:

// Инициализация выбора способа оплаты
document.addEventListener('DOMContentLoaded', function() {
    // Выбор первого способа оплаты по умолчанию
    const firstPaymentMethod = document.querySelector('.payment-method');
    if (firstPaymentMethod) {
        firstPaymentMethod.classList.add('selected');
    }
    
    // Закрытие модального окна при нажатии ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('payment-modal');
            if (modal) modal.style.display = 'none';
        }
    });
});
// Обработка модального окна
const modal = document.getElementById("payment-modal");
const donateBtn = document.getElementById("donate-btn");
const closeBtn = document.querySelector(".close");
const paymentMethods = document.querySelectorAll(".payment-method");
const confirmBtn = document.getElementById("confirm-payment");
const amountInput = document.getElementById("donation-amount");
const modalAmount = document.getElementById("modal-amount");

donateBtn.addEventListener("click", function() {
    const amount = amountInput.value || "500";
    modalAmount.textContent = amount;
    modal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

paymentMethods.forEach(method => {
    method.addEventListener("click", function() {
        paymentMethods.forEach(m => m.classList.remove("selected"));
        this.classList.add("selected");
        
        // Показываем поля для карты если выбран этот способ
        if (this.dataset.method === "card") {
            document.getElementById("card-details").style.display = "block";
        } else {
            document.getElementById("card-details").style.display = "none";
        }
    });
});

confirmBtn.addEventListener("click", function() {
    alert("Спасибо за ваше пожертвование!");
    modal.style.display = "none";
});