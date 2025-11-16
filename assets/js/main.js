// Utility: assign current year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Artwork 페이지: 썸네일 적용 및 모달
const artworkButtons = Array.from(document.querySelectorAll('.artwork'));

// 작품별 상세 설명 매핑
const artworkDescriptions = {
	a4: {
		text: `\n신체는 숨이 붙어 있는 한 결코 떼어낼 수도, 잃어버릴 수도 없는 유일한 존재이며 무엇도 개입할 수 없다고 믿었다. 하지만 보이지 않는 사회적, 정신적 균열들이 나와 나의 신체를 멀어지게 하거나 잃게 한다. 그리고 나도 모르게 내 몸에서 떨어져 나온 각질과 염증들이 제3의 일부가 되어 다시 태어난다. 누군가의 염증과 정신 또한 이미 나의 신체 속에서, 타인의 안에서 재탄생 하고 동시에 죽어가고 있다. 나는 그 중에서 소멸과 회복, 염증과 용서로 덧대어지는 순환에 집중한다. 다양한 촬영기법의 합성과 불규칙적으로 교차되는 반복된 수작업은 이러한 흐름을 포착하기 위함이다.`,
		meta: `심혜원, <안녕히 계세요>, 2025, 잉크젯 프린트, 판넬 디지털 출력, 혼합매체, 118.9 x 84.1 cm`
	}
};

function escapeHTML(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

if (artworkButtons.length) {
	artworkButtons.forEach(btn => {
		const imgPath = btn.getAttribute('data-img');
		if (!imgPath) return;
		
		// 원본 이미지 비율 자동 감지 및 적용
		const img = new Image();
		img.onload = function() {
			const aspectRatio = this.naturalWidth / this.naturalHeight;
			btn.style.aspectRatio = aspectRatio.toString();
		};
		img.src = imgPath;
		
		// 썸네일은 항상 cover로 표시
		btn.style.background = `url("${imgPath}") center / cover no-repeat`;
		const label = btn.querySelector('span'); if (label) label.style.visibility = 'hidden';
	});
}

// 현재 섹션에 따라 헤더 링크 굵게 표시
(function activateSectionOnScroll(){
	const links = Array.from(document.querySelectorAll('.nav__links a[href^="#"]'));
	if (!links.length) return;
	const idFromHref = href => href.replace(/^.*#/, '');
	const targets = links
		.map(a => document.getElementById(idFromHref(a.getAttribute('href'))))
		.filter(Boolean);
	if (!targets.length) return;
	const map = new Map(targets.map((el) => [el.id, links.find(a => idFromHref(a.getAttribute('href')) === el.id)]));
	
	// 각 섹션이 뷰포트에서 차지하는 비율을 계산하여 가장 많이 보이는 섹션 선택
	const sectionRatios = new Map();
	const io = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const id = entry.target.id;
			if (entry.isIntersecting) {
				// 교차 영역 비율 저장
				const ratio = entry.intersectionRatio;
				sectionRatios.set(id, ratio);
			} else {
				sectionRatios.delete(id);
			}
		});
		
		// 가장 많이 보이는 섹션 찾기
		if (sectionRatios.size > 0) {
			let maxRatio = 0;
			let activeId = null;
			sectionRatios.forEach((ratio, id) => {
				if (ratio > maxRatio) {
					maxRatio = ratio;
					activeId = id;
				}
			});
			
			if (activeId) {
				links.forEach(a => a.classList.remove('active'));
				const active = map.get(activeId);
				active && active.classList.add('active');
			}
		}
	}, { rootMargin: '-10% 0px -10% 0px', threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] });
	targets.forEach(t => io.observe(t));
})();

// Modal interactions
const modal = document.getElementById('artwork-modal');
if (modal) {
	const modalImg = document.getElementById('modal-image');
	const modalDesc = document.getElementById('modal-desc');
	const modalDescContent = document.getElementById('modal-desc-content');
	const modalMeta = document.getElementById('modal-meta');
	artworkButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			const title = btn.getAttribute('data-title') || '';
			const src = btn.getAttribute('data-img') || '';
			modalImg.src = src;
			modalImg.alt = title;
			const custom = artworkDescriptions[title];
			if (custom && typeof custom === 'object') {
				modalDescContent.innerHTML = escapeHTML(custom.text).replace(/\n/g, '<br>');
				modalMeta.textContent = custom.meta;
			} else if (typeof custom === 'string') {
				modalDescContent.innerHTML = escapeHTML(custom).replace(/\n/g, '<br>');
				modalMeta.textContent = '';
			} else {
				modalDescContent.textContent = `${title} 작품 상세 설명 예시입니다.`;
				modalMeta.textContent = '';
			}
			if (typeof modal.showModal === 'function') modal.showModal();
			else modal.setAttribute('open', '');
			// 히스토리에 상태를 남겨 뒤로가기로 닫히도록
			try { history.pushState({ modalOpen: true }, '', '#detail'); } catch {}
		});
	});
	const closeBtn = document.querySelector('.modal__close');
	closeBtn && closeBtn.addEventListener('click', () => {
		// 가능하면 브라우저 뒤로가기를 사용해 닫기
		if (history.state && history.state.modalOpen) {
			history.back();
			return;
		}
		if (typeof modal.close === 'function') modal.close();
		else modal.removeAttribute('open');
	});
	// 뒤로가기(popstate) 시 모달이 열려 있으면 닫기
	window.addEventListener('popstate', () => {
		if (modal.open) {
			if (typeof modal.close === 'function') modal.close();
			else modal.removeAttribute('open');
		}
	});
	// Esc 키로 닫기 보강
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.open) {
			if (history.state && history.state.modalOpen) {
				history.back();
				return;
			}
			if (typeof modal.close === 'function') modal.close();
			else modal.removeAttribute('open');
		}
	});
}


