// Utility: assign current year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Artwork 페이지: 썸네일 적용 및 모달
const artworkButtons = Array.from(document.querySelectorAll('.artwork'));

// 작품별 상세 설명 매핑
// 각 작품의 data-title 값을 키로 사용합니다
const artworkDescriptions = {
	'thumnail3': {
		text: `사회 속 개인은 섬과 같다,`,
		meta: `심혜원, <island>, 2025, 단채널비디오, 컬러, 무음, 1분 15초`
	},
	'thumbnail2': {
		text: `나도 나를 모르겠는데 자화상을 어떻게 그리지, 내가 나를 제대로 볼 수 있나? 그리고 어제의 내가 다르고 오늘의 내가 다른데 정지된 매체에 어떻게 그리지? 나는 사람들에게 있는 그대로 보이고 있을까? 라는 의문들을 조합하여 모자이크를 활용한 영상매체 제작했다. 다양한 규격의 모자이크로 가려진 나는 형태보다 색으로 구분되는데, 모자이크의 사이즈가 커질수록 나의 색 보다는 주변 배경으로 주객전도 된다. 타인과 비이성적인 나에게는 온전한 내면이 아닌 외부요인으로 평가되는 것을 비유했다. <자화상, 알 수 없음>이라는 제목과 영상의 불안정한 속도로 동시대의 자화상임을 표현한다. `,
		meta: `심혜원, <자화상, 알 수 없음>, 2025, 단채널비디오, 컬러, 무음, 10분 45초`
	},
	'p3': {
		text: `신체는 숨이 붙어 있는 한 결코 떼어낼 수도, 잃어버릴 수도 없는 유일한 존재이며 무엇도 개입할 수 없다고 믿었다. 하지만 보이지 않는 사회적, 정신적 균열들이 나와 나의 신체를 멀어지게 하거나 잃게 한다. 그리고 나도 모르게 내 몸에서 떨어져 나온 각질과 염증들이 제3의 일부가 되어 다시 태어난다. 누군가의 염증과 정신 또한 이미 나의 신체 속에서, 타인의 안에서 재탄생 하고 동시에 죽어가고 있다. 나는 그 중에서 소멸과 회복, 염증과 용서로 덧대어지는 순환에 집중한다. 다양한 촬영기법의 합성과 불규칙적으로 교차되는 반복된 수작업은 이러한 흐름을 포착하기 위함이다.`,
		meta: `심혜원, <그리고 남겨진 것들>, 2025, 잉크젯 프린트, 판넬에 디지털 프린트, 혼합매체, 118.9 x 84.1 cm`
	},
	'p6': {
		text: `물살이 아무리 무거워도 일단…`,
		meta: `심혜원, <이동합시다>, 2025, 디지털, 가변크기`
	},
	'p7': {
		text: `우리들에게는 어느 정도의 거리가 적절할까`,
		meta: `심혜원, <거리유지의 미학>, 2025, 가변크기 `
	},
	'thumbnail1': {
		text: `파탄: 찢어져 터짐…
		가정의 한 사건을 균열이라는 단어가 더 어울리게 재구성한 단편영화`,
		meta: `심혜원, <균열>, 2024, 단채널비디오, 컬러, 스테레오, 8분 50초`
	},
	'p5': {
		text: `신체는 숨이 붙어 있는 한 결코 떼어낼 수도, 잃어버릴 수도 없는 유일한 존재이며 무엇도 개입할 수 없다고 믿었다. 하지만 보이지 않는 사회적, 정신적 균열들이 나와 나의 신체를 멀어지게 하거나 잃게 한다. 그리고 나도 모르게 내 몸에서 떨어져 나온 각질과 염증들이 제3의 일부가 되어 다시 태어난다. 누군가의 염증과 정신 또한 이미 나의 신체 속에서, 타인의 안에서 재탄생 하고 동시에 죽어가고 있다. 나는 그 중에서 소멸과 회복, 염증과 용서로 덧대어지는 순환에 집중한다. 다양한 촬영기법의 합성과 불규칙적으로 교차되는 반복된 수작업은 이러한 흐름을 포착하기 위함이다.`,
		meta: `심혜원, <염증>, 2025, 잉크젯 프린트, 캔버스 디지털 출력, 혼합매체, 59.4 x 59.4 cm `
	},
	'p4': {
		text: `신체는 숨이 붙어 있는 한 결코 떼어낼 수도, 잃어버릴 수도 없는 유일한 존재이며 무엇도 개입할 수 없다고 믿었다. 하지만 보이지 않는 사회적, 정신적 균열들이 나와 나의 신체를 멀어지게 하거나 잃게 한다. 그리고 나도 모르게 내 몸에서 떨어져 나온 각질과 염증들이 제3의 일부가 되어 다시 태어난다. 누군가의 염증과 정신 또한 이미 나의 신체 속에서, 타인의 안에서 재탄생 하고 동시에 죽어가고 있다. 나는 그 중에서 소멸과 회복, 염증과 용서로 덧대어지는 순환에 집중한다. 다양한 촬영기법의 합성과 불규칙적으로 교차되는 반복된 수작업은 이러한 흐름을 포착하기 위함이다.`,
		meta: `심혜원, <용서>, 2025, 잉크젯 프린트, 캔버스 디지털 출력, 혼합매체, 59.4 x 59.4 cm `
	},
	'p1': {
		text: `‘지나가는 것’과 ‘사라지는 것’은 개념적으로 다르다. 지나가는 것들은 시간이나 사건이 흐름에 따라 계속해서 진행되는 과정을 의미하고 어떤 것이 지속적으로 존재하지만 형태나 상태가 변할 수 있음을 내포한다. 하지만 사라지는 것은 어떤 것이 존재하던 것이 더 이상 존재하지 않게 되는 상태를 의미한다. 사라짐은 완전한 소멸이나 종결을 나타내며, 더 이상 그 존재를 인식할 수 없게 된다. 따라서, 지나가는 것은 변화와 지속성을 포함하는 반면, 사라지는 것은 완전한 소멸을 의미한다. 이러한 차이는 시간의 흐름과 존재의 지속성에 대한 것들을 이해시킨다. 하지만 사람들은 시야에서 사라졌다는 이유로 지나가버린 것들을 사라졌다고 말한다. 그렇기에 지나간다는 것은 시각적으로만 종결될 수도 있지만 그렇지 않은 경우에는 지나감과 동시에 사라질 수 있다. 즉 완전히 대척점에 있는 개념이 아니라 이 두 개념 사이에 중간개념이 존재한다는 것이다. 소멸, 변화, 이별 등… 수많은 것들이 지나가고 사라지지만 그 사이에 내가 있다. 나 또한 흔들리고 가끔은 지워질 수 있지만 지나가지 않고 사라지지 않는다. `,
		meta: `심혜원, <지나가는 것과 사라지는 것들>, 2024, 잉크젯 프린트, 폼보드에 디지털 프린트, 혼합매체, 59.4 x 84.1 cm `
	},
	'p2': {
		text: `신체는 숨이 붙어 있는 한 결코 떼어낼 수도, 잃어버릴 수도 없는 유일한 존재이며 무엇도 개입할 수 없다고 믿었다. 하지만 보이지 않는 사회적, 정신적 균열들이 나와 나의 신체를 멀어지게 하거나 잃게 한다. 그리고 나도 모르게 내 몸에서 떨어져 나온 각질과 염증들이 제3의 일부가 되어 다시 태어난다. 누군가의 염증과 정신 또한 이미 나의 신체 속에서, 타인의 안에서 재탄생 하고 동시에 죽어가고 있다. 나는 그 중에서 소멸과 회복, 염증과 용서로 덧대어지는 순환에 집중한다. 다양한 촬영기법의 합성과 불규칙적으로 교차되는 반복된 수작업은 이러한 흐름을 포착하기 위함이다.`,
		meta: `심혜원, <안녕히 계세요>, 2025, 잉크젯 프린트, 판넬에 디지털 프린트, 혼합매체, 118.9 x 84.1 cm`
	},
	'thumbnail4': {
		text: `인간과 비인간의 경계 `,
		meta: `심혜원, <island>, 2025, 단채널비디오, 컬러, 스테레오, 2분 48초`
	},
	'thumbnail5': {
		text: `불필요한 언어 `,
		meta: `심혜원, <Noise>, 2025, 단채널비디오, 컬러, 무음, 1분 8초`
	},
	'thumbnail6': {
		text: `“믿고 싶지는 않지만 이제는 믿지 않을 수 없다. 병이다. 단순 범죄와는 다르다.”`,
		meta: `심혜원, <가모우 마사코의 관찰일지>, 2025, 단채널비디오, 컬러, 무음, 60분 19초`
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
	// 작품별 YouTube 영상 ID 매핑
	const artworkVideos = {
		'thumbnail1': 'z9u9nssaHdU',
		'thumbnail2': 'PZSoOHhT0gQ',
		'thumnail3': '-GZOuPElw-o',
		'thumbnail4': 'ujHUmVPbg18',
		'thumbnail5': 'l447fRP3C-o',
		'thumbnail6': 'GR5j8BSa0hE'
	};

	const modalImg = document.getElementById('modal-image');
	const modalDesc = document.getElementById('modal-desc');
	const modalDescContent = document.getElementById('modal-desc-content');
	const modalMeta = document.getElementById('modal-meta');
	const modalVideo = document.getElementById('modal-video');
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
			// 해당 작품에 YouTube 영상이 있으면 표시
			const videoId = artworkVideos[title];
			if (videoId) {
				modalVideo.style.display = 'block';
				modalVideo.innerHTML = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
			} else {
				modalVideo.style.display = 'none';
				modalVideo.innerHTML = '';
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

// 페이지를 떠날 때 확인 메시지 표시
window.addEventListener('beforeunload', function(e) {
	e.preventDefault();
	e.returnValue = ''; // Chrome에서는 빈 문자열이면 기본 메시지 사용
	return ''; // 일부 브라우저에서는 return 값 필요
});

