document.addEventListener('DOMContentLoaded', () => {
  // DOM 요소
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const startButton = document.getElementById('start-button');
  const instructionsPopup = document.getElementById('instructions-popup');
  const nextButton = document.getElementById('next-button');
  const difficultyPopup = document.getElementById('difficulty-popup');
  const easyButton = document.getElementById('easy-button');
  const successPopup = document.getElementById('success-popup');
  const failPopup = document.getElementById('fail-popup');
  const nextWordButton = document.getElementById('next-word-button');
  const retryButton = document.getElementById('retry-button');
  const gameBoard = document.getElementById('game-board');
  const keyboard = document.getElementById('keyboard');
  const timerDisplay = document.getElementById('timer');
  const timeUpPopup = document.getElementById('time-up-popup');
  const restartButton = document.getElementById('restart-button');

  // words.js에서 데이터 로드
  let wordData = [];
  let currentDifficulty = 'easy'; // 기본 난이도
  let currentWordIndex = 0; // 현재 단어 인덱스 초기화
  let correctCount = 0; // 맞힌 개수 추적

  // 게임 시작 시 난이도에 따른 데이터 로드 함수
  function loadWordDataByDifficulty(difficulty) {
    currentDifficulty = difficulty;
    if (WORDS && WORDS[difficulty]) {
      wordData = WORDS[difficulty].map((item) => ({
        word: item.vietnamese,
        meaning: item.korean,
        example: item.vietnameseExample,
        exampleMeaning: item.koreanExample,
      }));
      console.log(`난이도 ${difficulty}로 단어 ${wordData.length}개 로드됨`);
      return true;
    }
    return false;
  }

  let currentWord = '';
  let currentRow = 0;
  let currentTile = 0;
  let isGameOver = false;
  let timer;
  let timeLeft = 10 * 60; // 10분을 초 단위로 변환
  let lastInputLetter = null; // 마지막으로 입력된 문자 저장
  let currentWordSection = 0; // 현재 입력 중인 단어 섹션 (스페이스바로 구분)

  // 모든 팝업 숨기기 함수
  function hideAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      popup.style.display = 'none';
      popup.classList.remove('show');
    });
    console.log('모든 팝업이 숨겨졌습니다.');
  }

  // 게임 시작 버튼 클릭
  startButton.addEventListener('click', () => {
    console.log('게임 시작 버튼 클릭됨');
    startScreen.classList.add('hidden');

    // 게임 설명 팝업 표시
    setTimeout(() => {
      instructionsPopup.style.display = 'flex';
      instructionsPopup.classList.add('show');
      console.log('게임 설명 팝업 표시됨');
    }, 300);
  });

  // 다음 버튼 클릭
  nextButton.addEventListener('click', () => {
    console.log('다음 버튼 클릭됨');
    instructionsPopup.style.display = 'none';
    instructionsPopup.classList.remove('show');

    // 난이도 선택 팝업 표시
    setTimeout(() => {
      difficultyPopup.style.display = 'flex';
      difficultyPopup.classList.add('show');
      console.log('난이도 선택 팝업 표시됨');
    }, 300);
  });

  // 난이도 선택 버튼 이벤트 수정
  easyButton.addEventListener('click', function () {
    console.log('쉬움 난이도 버튼 클릭됨');
    loadWordDataByDifficulty('easy');
    hideAllPopups();
    startGame();
  });

  // 중급 난이도 버튼이 활성화된 경우에만 이벤트 추가
  if (!document.getElementById('intermediate-button').disabled) {
    document
      .getElementById('intermediate-button')
      .addEventListener('click', function () {
        console.log('중급 난이도 버튼 클릭됨');
        loadWordDataByDifficulty('intermediate');
        hideAllPopups();
        startGame();
      });
  }

  // 고급 난이도 버튼이 활성화된 경우에만 이벤트 추가
  if (!document.getElementById('advanced-button').disabled) {
    document
      .getElementById('advanced-button')
      .addEventListener('click', function () {
        console.log('고급 난이도 버튼 클릭됨');
        loadWordDataByDifficulty('advanced');
        hideAllPopups();
        startGame();
      });
  }

  // 다음 단어 버튼 이벤트 수정
  nextWordButton.addEventListener('click', () => {
    hideAllPopups();
    resetGame();
    // startTimer() 대신 resumeTimer() 사용
    resumeTimer();
  });

  // 다시하기 버튼
  retryButton.addEventListener('click', () => {
    hideAllPopups();
    difficultyPopup.classList.add('show');
  });

  // 게임 시작
  function startGame() {
    console.log('게임 시작 함수 호출됨');
    // 시작 화면 숨기기
    startScreen.classList.add('hidden');
    // 게임 화면 표시
    gameScreen.classList.remove('hidden');
    console.log('게임 화면 표시됨');

    // 맞힌 개수 초기화
    correctCount = 0;

    // 게임 초기화
    resetGame();
    startTimer(); // 처음 시작할 때만 타이머 시작
  }

  // 게임 리셋
  function resetGame() {
    gameBoard.innerHTML = '';
    currentWordIndex = Math.floor(Math.random() * wordData.length); // 랜덤 인덱스 선택
    currentWord = wordData[currentWordIndex].word;
    console.log('선택된 단어:', currentWord); // 디버깅용 출력
    createGameBoard(currentWord);
    resetKeyboard();
    currentRow = 0;
    currentTile = 0;
    currentWordSection = 0; // 단어 섹션 초기화
    isGameOver = false;
    lastInputLetter = null;
  }

  // 게임 보드 생성
  function createGameBoard(word) {
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('div');
      row.classList.add('row');

      let tileIndex = 0;
      for (let j = 0; j < word.length; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.row = i;
        tile.dataset.col = tileIndex;

        if (word[j] === ' ') {
          tile.classList.add('space-marker');
          tile.textContent = 'V'; // 스페이스 표시
          tile.dataset.space = 'true';
        }

        row.appendChild(tile);
        tileIndex++;
      }

      gameBoard.appendChild(row);
    }
  }

  // 키보드 리셋
  function resetKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      key.classList.remove('correct', 'present', 'absent');
    });
  }

  // 키보드 입력 처리 부분 전체 재작성
  document.addEventListener('keydown', (e) => {
    if (gameScreen.classList.contains('hidden') || isGameOver) return;

    const key = e.key;
    console.log(`키보드 입력: ${key}`);

    // 기본 컨트롤 키 처리
    if (key === 'Enter') {
      checkRow();
      return;
    } else if (key === 'Backspace') {
      deleteLetter();
      return;
    }

    // 스페이스 처리
    if (key === ' ') {
      // 이미 스페이스 마커가 있는 위치면 다음으로 이동
      if (currentTile < currentWord.length) {
        const tiles = document
          .querySelectorAll('.row')
          [currentRow].querySelectorAll('.tile');
        if (tiles[currentTile].dataset.space === 'true') {
          currentTile++;
          lastInputLetter = null;
        }
      }
      return;
    }

    // 알파벳 및 특수 키 처리 (소문자로 변환)
    const lowerKey = key.toLowerCase();

    // 성조 키 처리 - 이전 타일이 비어있지 않은 경우에만 성조 적용 시도
    if (['f', 's', 'r', 'x', 'j'].includes(lowerKey)) {
      const tiles = document
        .querySelectorAll('.row')
        [currentRow].querySelectorAll('.tile');
      const isFirstTileInRow = currentTile === 0;
      const isAfterSpace =
        currentTile > 0 &&
        tiles[currentTile - 1] &&
        tiles[currentTile - 1].dataset.space === 'true';

      // 스페이스 직후이거나 첫 번째 타일인 경우, 일반 알파벳으로 처리
      if (isFirstTileInRow || isAfterSpace || !lastInputLetter) {
        addLetter(lowerKey);
        return;
      }

      // 그 외의 경우 성조 적용 시도
      if (applyTone(lowerKey)) {
        return;
      }

      // 성조 적용이 실패하면 일반 알파벳으로 처리
      addLetter(lowerKey);
      return;
    }

    // 일반 알파벳 처리
    if (/^[a-z]$/.test(lowerKey)) {
      // 특수 모음 처리 시도
      if (
        ['a', 'e', 'o', 'u', 'w', 'd'].includes(lowerKey) &&
        lastInputLetter
      ) {
        if (tryApplySpecialVowel(lowerKey)) {
          return; // 특수 모음이 적용되었으면 종료
        }
      }

      // 특수 모음이 적용되지 않았으면 일반 문자 입력으로 처리
      addLetter(lowerKey);
    }
  });

  // 키보드 클릭 이벤트 핸들러 재작성
  keyboard.addEventListener('click', (e) => {
    if (!e.target.matches('.key') || isGameOver) return;

    const key = e.target.dataset.key;
    console.log(`클릭된 키: ${key}`);

    // 기본 컨트롤 키 처리
    if (key === 'Backspace') {
      deleteLetter();
      return;
    } else if (key === 'Enter') {
      checkRow();
      return;
    }

    // 스페이스 처리
    if (key === ' ') {
      // 이미 스페이스 마커가 있는 위치면 다음으로 이동
      if (currentTile < currentWord.length) {
        const tiles = document
          .querySelectorAll('.row')
          [currentRow].querySelectorAll('.tile');
        if (tiles[currentTile].dataset.space === 'true') {
          currentTile++;
          lastInputLetter = null;
        }
      }
      return;
    }

    // 성조 키 처리 - 이전 타일이 비어있지 않은 경우에만 성조 적용 시도
    if (['f', 's', 'r', 'x', 'j'].includes(key)) {
      const tiles = document
        .querySelectorAll('.row')
        [currentRow].querySelectorAll('.tile');
      const isFirstTileInRow = currentTile === 0;
      const isAfterSpace =
        currentTile > 0 &&
        tiles[currentTile - 1] &&
        tiles[currentTile - 1].dataset.space === 'true';

      // 스페이스 직후이거나 첫 번째 타일인 경우, 일반 알파벳으로 처리
      if (isFirstTileInRow || isAfterSpace || !lastInputLetter) {
        addLetter(key);
        return;
      }

      // 그 외의 경우 성조 적용 시도
      if (applyTone(key)) {
        return;
      }

      // 성조 적용이 실패하면 일반 알파벳으로 처리
      addLetter(key);
      return;
    }

    // 특수 모음 조합에 사용되는 키인지 체크
    if (
      ['a', 'e', 'o', 'u', 'w', 'd', 'A', 'E', 'O', 'U', 'W', 'D'].includes(
        key
      ) &&
      lastInputLetter
    ) {
      if (tryApplySpecialVowel(key)) {
        return; // 특수 모음이 적용되었으면 종료
      }
    }

    // 일반 알파벳 입력
    addLetter(key);
  });

  // 글자 추가 함수 단순화 (기본 기능부터 확실히)
  function addLetter(letter) {
    if (currentTile >= currentWord.length) return;

    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');

    // 현재 타일이 스페이스인 경우 건너뛰기
    if (
      currentTile < tiles.length &&
      tiles[currentTile].dataset.space === 'true'
    ) {
      currentTile++;
      if (currentTile < currentWord.length) {
        // 재귀적으로 다음 타일에 입력 시도
        addLetter(letter);
      }
      return;
    }

    // 일반 타일에 글자 입력
    if (currentTile < tiles.length) {
      const tile = tiles[currentTile];
      tile.textContent = letter;
      tile.dataset.letter = letter;
      lastInputLetter = letter;
      currentTile++;
    }
  }

  // 특수 모음 적용 함수 단순화
  function tryApplySpecialVowel(key) {
    if (!lastInputLetter) return false;

    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');

    // 현재 커서 위치 바로 앞의 타일 확인
    let targetIndex = currentTile - 1;
    if (targetIndex < 0) return false;

    const targetTile = tiles[targetIndex];
    if (
      !targetTile ||
      !targetTile.dataset.letter ||
      targetTile.dataset.space === 'true'
    ) {
      return false;
    }

    // 특수 모음 조합 시도
    const prevLetter = targetTile.dataset.letter;
    const specialVowel = getSpecialVowel(prevLetter, key);

    if (specialVowel) {
      console.log(`특수 모음 적용: ${prevLetter} + ${key} = ${specialVowel}`);
      targetTile.textContent = specialVowel;
      targetTile.dataset.letter = specialVowel;
      lastInputLetter = specialVowel;
      return true;
    }

    return false;
  }

  // 성조 적용 함수 개선 - 성공/실패 여부 반환
  function applyTone(toneKey) {
    if (currentTile <= 0) return false;

    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');

    // 현재 커서 위치 바로 앞의 타일 확인
    let targetIndex = currentTile - 1;
    if (targetIndex < 0) return false;

    const targetTile = tiles[targetIndex];
    if (
      !targetTile ||
      !targetTile.dataset.letter ||
      targetTile.dataset.space === 'true'
    ) {
      return false;
    }

    const letter = targetTile.dataset.letter;
    const tonedLetter = addToneToLetter(letter, toneKey);

    if (tonedLetter && tonedLetter !== letter) {
      console.log(`성조 적용: ${toneKey}를 ${letter}에 적용 -> ${tonedLetter}`);
      targetTile.textContent = tonedLetter;
      targetTile.dataset.letter = tonedLetter;
      lastInputLetter = tonedLetter;
      return true;
    }

    return false;
  }

  // 특수 모음 변환 함수 간소화
  function getSpecialVowel(prev, current) {
    // 단일 문자 특수 모음 변환
    if (prev === 'a' && current === 'a') return 'â';
    if (prev === 'a' && current === 'w') return 'ă';
    if (prev === 'e' && current === 'e') return 'ê';
    if (prev === 'o' && current === 'o') return 'ô';
    if (prev === 'o' && current === 'w') return 'ơ';
    if (prev === 'u' && current === 'w') return 'ư';
    if (prev === 'd' && current === 'd') return 'đ';

    // 대문자 버전
    if (prev === 'A' && current === 'A') return 'Â';
    if (prev === 'A' && current === 'W') return 'Ă';
    if (prev === 'E' && current === 'E') return 'Ê';
    if (prev === 'O' && current === 'O') return 'Ô';
    if (prev === 'O' && current === 'W') return 'Ơ';
    if (prev === 'U' && current === 'W') return 'Ư';
    if (prev === 'D' && current === 'D') return 'Đ';

    // 복합 문자에 특수 모음 적용은 복잡성을 줄이기 위해 여기서는 생략
    return null;
  }

  // 행 체크
  function checkRow() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    let guess = '';

    for (let i = 0; i < currentWord.length; i++) {
      const tile = tiles[i];
      if (tile.dataset.space === 'true') {
        guess += ' ';
      } else {
        guess += tile.dataset.letter || '';
      }
    }

    // 입력이 완전하지 않은 경우
    if (guess.length !== currentWord.length) {
      alert('모든 칸을 채워주세요!');
      return;
    }

    // 단어 검사
    checkGuess(guess, tiles);

    // 정답인 경우
    if (guess === currentWord) {
      handleWin();
      return;
    }

    // 모든 시도를 다 사용한 경우
    if (currentRow === 5) {
      handleLoss();
      return;
    }

    // 다음 행으로 이동
    currentRow++;
    currentTile = 0;
  }

  // 추측 단어 검사
  function checkGuess(guess, tiles) {
    const guessArray = guess.split('');
    const wordArray = currentWord.split('');

    // 첫 번째 패스: 정확한 위치 검사
    for (let i = 0; i < guessArray.length; i++) {
      if (tiles[i].dataset.space === 'true') continue;

      if (guessArray[i] === wordArray[i]) {
        tiles[i].classList.add('correct');
        updateKeyboard(guessArray[i], 'correct');
        wordArray[i] = null; // 매치된 글자 표시
      }
    }

    // 두 번째 패스: 다른 위치 검사
    for (let i = 0; i < guessArray.length; i++) {
      if (
        tiles[i].dataset.space === 'true' ||
        tiles[i].classList.contains('correct')
      )
        continue;

      const letterIndex = wordArray.indexOf(guessArray[i]);
      if (letterIndex !== -1) {
        tiles[i].classList.add('present');
        updateKeyboard(guessArray[i], 'present');
        wordArray[letterIndex] = null; // 매치된 글자 표시
      } else {
        tiles[i].classList.add('absent');
        updateKeyboard(guessArray[i], 'absent');
      }
    }
  }

  // 키보드 업데이트
  function updateKeyboard(letter, status) {
    const key = document.querySelector(`.key[data-key="${letter}"]`);
    if (!key) return;

    if (status === 'correct') {
      key.classList.remove('present', 'absent');
      key.classList.add('correct');
    } else if (status === 'present' && !key.classList.contains('correct')) {
      key.classList.remove('absent');
      key.classList.add('present');
    } else if (
      status === 'absent' &&
      !key.classList.contains('correct') &&
      !key.classList.contains('present')
    ) {
      key.classList.add('absent');
    }
  }

  // 타이머 관련 변수 추가
  let timerPaused = false;

  // 타이머 시작 함수 수정
  function startTimer() {
    clearInterval(timer);
    timeLeft = 10 * 60; // 초기 10분 설정
    updateTimerDisplay();

    timer = setInterval(() => {
      if (!timerPaused) {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
          clearInterval(timer);
          handleTimeUp();
        }
      }
    }, 1000);
  }

  // 타이머 일시정지 함수 추가
  function pauseTimer() {
    timerPaused = true;
  }

  // 타이머 재개 함수 추가
  function resumeTimer() {
    timerPaused = false;
  }

  // 타이머 표시 업데이트
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  // 타이머 종료 처리 함수 수정
  function handleTimeUp() {
    isGameOver = true;
    clearInterval(timer);

    // 맞힌 개수 표시
    document.getElementById('correct-count').textContent = correctCount;

    // 약간의 딜레이 후에 게임 종료 팝업 표시
    setTimeout(() => {
      hideAllPopups();
      timeUpPopup.classList.add('show');
    }, 1000);
  }

  // 성공 처리 함수 수정
  function handleWin() {
    isGameOver = true;
    pauseTimer(); // 타이머 일시정지
    correctCount++; // 맞힌 개수 증가

    const currentWordData = wordData.find((word) => word.word === currentWord);

    document.getElementById('viet-word').textContent = currentWordData.word;
    document.getElementById('korean-word').textContent =
      currentWordData.meaning;
    document.getElementById('viet-example').textContent =
      currentWordData.example;
    document.getElementById('korean-example').textContent =
      currentWordData.exampleMeaning;

    // 약간의 딜레이 후에 성공 팝업 표시
    setTimeout(() => {
      hideAllPopups();
      successPopup.classList.add('show');
    }, 1000);
  }

  // 실패 처리
  function handleLoss() {
    isGameOver = true;
    clearInterval(timer);

    document.getElementById(
      'answer-word'
    ).textContent = `${wordData[currentWordIndex].word} (${wordData[currentWordIndex].meaning})`;

    // 약간의 딜레이 후에 실패 팝업 표시
    setTimeout(() => {
      hideAllPopups();
      failPopup.classList.add('show');
    }, 1000);
  }

  // 게임 보드 클릭 이벤트 리스너 추가 (타일 선택 기능)
  gameBoard.addEventListener('click', (e) => {
    if (isGameOver) return;

    // 클릭한 타일 찾기
    let target = e.target;
    while (target !== gameBoard && !target.classList.contains('tile')) {
      target = target.parentElement;
    }

    if (target.classList.contains('tile')) {
      // 해당 타일의 행과 열 확인
      const row = parseInt(target.dataset.row);
      const col = parseInt(target.dataset.col);

      // 현재 행에서만 클릭 허용
      if (row === currentRow) {
        // 스페이스 타일이 아닌 경우에만 커서 위치 변경
        if (target.dataset.space !== 'true') {
          // 이미 문자가 있는 타일까지만 커서 이동 허용
          let tileHasLetter = false;

          // 클릭한 타일의 앞쪽 타일들 중 하나라도 비어있으면 안됨
          for (let i = 0; i < col; i++) {
            const prevTile = document.querySelector(
              `.tile[data-row="${row}"][data-col="${i}"]`
            );
            if (!prevTile.dataset.letter && prevTile.dataset.space !== 'true') {
              tileHasLetter = true;
              break;
            }
          }

          if (!tileHasLetter) {
            currentTile = col;
            console.log(`커서 위치 변경: ${currentTile}`);
          }
        }
      }
    }
  });

  // 단어를 섹션으로 분리하는 함수
  function getWordSections(word) {
    return word.split(' ').filter((section) => section.length > 0);
  }

  // 단어 섹션 별 자동 이동 강화
  function checkCurrentSection() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    const sections = getWordBoundaries();

    if (sections.length === 0 || currentWordSection >= sections.length) return;

    const currentSection = sections[currentWordSection];
    let allFilled = true;

    // 현재 섹션의 모든 칸이 채워졌는지 확인
    for (let i = currentSection.start; i <= currentSection.end; i++) {
      if (!tiles[i].dataset.letter) {
        allFilled = false;
        break;
      }
    }

    // 모든 칸이 채워졌고 다음 섹션이 있으면 자동으로 다음 섹션으로 이동
    if (allFilled && currentWordSection < sections.length - 1) {
      const nextSection = sections[currentWordSection + 1];
      // 스페이스바 다음으로 이동
      currentTile = nextSection.start;
      currentWordSection++;
      lastInputLetter = null;
    }
  }

  // 단어 영역 식별 함수 추가 (스페이스바 기준으로 단어 구분)
  function getWordBoundaries() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    const boundaries = [];
    let start = 0;

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].dataset.space === 'true') {
        // 스페이스바 발견 - 이전 단어의 끝
        boundaries.push({ start: start, end: i - 1 });
        // 다음 단어의 시작은 스페이스바 다음
        start = i + 1;
      }
    }

    // 마지막 단어 추가
    if (start < tiles.length) {
      boundaries.push({ start: start, end: tiles.length - 1 });
    }

    return boundaries;
  }

  // 현재 커서가 위치한 단어 영역 찾기 함수 추가
  function getCurrentWordBoundary() {
    const boundaries = getWordBoundaries();
    for (const boundary of boundaries) {
      if (currentTile >= boundary.start && currentTile <= boundary.end) {
        return boundary;
      }
      // 스페이스바 직후 커서인 경우
      if (currentTile === boundary.start && boundary.start > 0) {
        return boundary;
      }
    }
    return null;
  }

  // 특정 단어 영역의 다음 빈 타일 찾기
  function findNextEmptyTileInWord(boundary) {
    if (!boundary) return -1;

    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    for (let i = boundary.start; i <= boundary.end; i++) {
      if (!tiles[i].dataset.letter && !tiles[i].dataset.space) {
        return i;
      }
    }

    // 모든 칸이 채워졌으면 다음 단어의 시작으로 이동
    if (
      boundary.end + 1 < tiles.length &&
      tiles[boundary.end + 1].dataset.space === 'true'
    ) {
      if (boundary.end + 2 < tiles.length) {
        return boundary.end + 2; // 스페이스바 다음 칸
      }
    }

    return -1;
  }

  // 다음 단어로 이동하는 함수 추가
  function moveToNextWord() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    for (let i = currentTile; i < tiles.length; i++) {
      if (tiles[i].dataset.space === 'true' && i + 1 < tiles.length) {
        currentTile = i + 1; // 스페이스바 다음 칸으로 이동
        lastInputLetter = null; // 입력 상태 초기화
        console.log(`다음 단어로 이동: ${currentTile}`);
        return true;
      }
    }
    return false;
  }

  // 다음 섹션으로 강제 이동 함수
  function moveToNextSection() {
    const sections = getWordBoundaries();
    if (currentWordSection < sections.length - 1) {
      currentWordSection++;
      currentTile = sections[currentWordSection].start;
      lastInputLetter = null;
    }
  }

  // 글자 삭제 함수 추가
  function deleteLetter() {
    if (currentTile <= 0) return;

    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    currentTile--;

    // 스페이스 타일인 경우 다시 이전으로 이동
    if (tiles[currentTile].dataset.space === 'true') {
      currentTile--;
      if (currentTile < 0) currentTile = 0;
    }

    // 일반 타일 삭제
    if (currentTile >= 0) {
      const tile = tiles[currentTile];
      if (!tile.dataset.space) {
        tile.textContent = '';
        delete tile.dataset.letter;

        // 이전 타일 정보 업데이트
        if (currentTile > 0) {
          for (let i = currentTile - 1; i >= 0; i--) {
            if (tiles[i].dataset.letter && !tiles[i].dataset.space) {
              lastInputLetter = tiles[i].dataset.letter;
              break;
            }
          }
        } else {
          lastInputLetter = null;
        }
      }
    }
  }

  // 성조 적용 함수 추가
  function addToneToLetter(letter, toneKey) {
    if (!letter || letter.length === 0) return null;

    // 베트남어 문자에 성조 추가 규칙
    const toneMap = {
      a: { f: 'à', s: 'á', r: 'ả', x: 'ã', j: 'ạ' },
      ă: { f: 'ằ', s: 'ắ', r: 'ẳ', x: 'ẵ', j: 'ặ' },
      â: { f: 'ầ', s: 'ấ', r: 'ẩ', x: 'ẫ', j: 'ậ' },
      e: { f: 'è', s: 'é', r: 'ẻ', x: 'ẽ', j: 'ẹ' },
      ê: { f: 'ề', s: 'ế', r: 'ể', x: 'ễ', j: 'ệ' },
      i: { f: 'ì', s: 'í', r: 'ỉ', x: 'ĩ', j: 'ị' },
      o: { f: 'ò', s: 'ó', r: 'ỏ', x: 'õ', j: 'ọ' },
      ô: { f: 'ồ', s: 'ố', r: 'ổ', x: 'ỗ', j: 'ộ' },
      ơ: { f: 'ờ', s: 'ớ', r: 'ở', x: 'ỡ', j: 'ợ' },
      u: { f: 'ù', s: 'ú', r: 'ủ', x: 'ũ', j: 'ụ' },
      ư: { f: 'ừ', s: 'ứ', r: 'ử', x: 'ữ', j: 'ự' },
      y: { f: 'ỳ', s: 'ý', r: 'ỷ', x: 'ỹ', j: 'ỵ' },
      // 대문자 버전
      A: { f: 'À', s: 'Á', r: 'Ả', x: 'Ã', j: 'Ạ' },
      Ă: { f: 'Ằ', s: 'Ắ', r: 'Ẳ', x: 'Ẵ', j: 'Ặ' },
      Â: { f: 'Ầ', s: 'Ấ', r: 'Ẩ', x: 'Ẫ', j: 'Ậ' },
      E: { f: 'È', s: 'É', r: 'Ẻ', x: 'Ẽ', j: 'Ẹ' },
      Ê: { f: 'Ề', s: 'Ế', r: 'Ể', x: 'Ễ', j: 'Ệ' },
      I: { f: 'Ì', s: 'Í', r: 'Ỉ', x: 'Ĩ', j: 'Ị' },
      O: { f: 'Ò', s: 'Ó', r: 'Ỏ', x: 'Õ', j: 'Ọ' },
      Ô: { f: 'Ồ', s: 'Ố', r: 'Ổ', x: 'Ỗ', j: 'Ộ' },
      Ơ: { f: 'Ờ', s: 'Ớ', r: 'Ở', x: 'Ỡ', j: 'Ợ' },
      U: { f: 'Ù', s: 'Ú', r: 'Ủ', x: 'Ũ', j: 'Ụ' },
      Ư: { f: 'Ừ', s: 'Ứ', r: 'Ử', x: 'Ữ', j: 'Ự' },
      Y: { f: 'Ỳ', s: 'Ý', r: 'Ỷ', x: 'Ỹ', j: 'Ỵ' },
    };

    // 기본적으로 첫 글자에 성조 적용 시도
    const firstLetter = letter.charAt(0);
    if (toneMap[firstLetter] && toneMap[firstLetter][toneKey]) {
      return toneMap[firstLetter][toneKey] + letter.substring(1);
    }

    // 모음 찾기 - 베트남어에서는 성조가 주로 모음에 적용됨
    const vowels = [
      'a',
      'ă',
      'â',
      'e',
      'ê',
      'i',
      'o',
      'ô',
      'ơ',
      'u',
      'ư',
      'y',
      'A',
      'Ă',
      'Â',
      'E',
      'Ê',
      'I',
      'O',
      'Ô',
      'Ơ',
      'U',
      'Ư',
      'Y',
    ];

    // 단어에서 가장 오른쪽 모음 찾기
    for (let i = letter.length - 1; i >= 0; i--) {
      const char = letter.charAt(i);
      if (vowels.includes(char) && toneMap[char] && toneMap[char][toneKey]) {
        return (
          letter.substring(0, i) +
          toneMap[char][toneKey] +
          letter.substring(i + 1)
        );
      }
    }

    return letter; // 성조를 적용할 수 없는 경우 원래 글자 반환
  }

  // 단어 검증 함수
  function checkWord() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    let guess = '';

    for (let i = 0; i < currentWord.length; i++) {
      const tile = tiles[i];
      if (tile.dataset.space === 'true') {
        guess += ' ';
      } else {
        guess += tile.dataset.letter || '';
      }
    }

    // 입력이 완전하지 않은 경우
    if (guess.length !== currentWord.length) {
      alert('모든 칸을 채워주세요!');
      return;
    }

    // 단어 검사
    checkGuess(guess, tiles);

    // 정답인 경우
    if (guess === currentWord) {
      handleWin();
      return;
    }

    // 모든 시도를 다 사용한 경우
    if (currentRow === 5) {
      handleLoss();
      return;
    }

    // 다음 행으로 이동
    currentRow++;
    currentTile = 0;
    currentWordSection = 0; // 다음 행으로 넘어갈 때 섹션도 초기화
  }

  // 현재 단어 섹션 정보 가져오기 (함수 추가)
  function getCurrentWordSections() {
    return getWordSections(currentWord);
  }

  // 현재 입력 단어 가져오기 (함수 추가)
  function getCurrentWord() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    let word = '';

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].dataset.space === 'true') {
        word += ' ';
      } else {
        word += tiles[i].dataset.letter || '';
      }
    }

    return word;
  }

  // 타일 색상 표시 함수 (함수 추가)
  function colorTiles() {
    const tiles = document
      .querySelectorAll('.row')
      [currentRow].querySelectorAll('.tile');
    const guess = getCurrentWord();
    const guessArray = guess.split('');
    const wordArray = currentWord.split('');

    // checkGuess 함수와 동일한 로직으로 타일 색상화
    // 이미 checkGuess 함수가 이 작업을 수행하므로 여기서는 생략
  }

  // 다음 단어 로드 함수
  function loadNextWord() {
    // 이전 단어를 제외하고 랜덤으로 새 단어 선택
    const previousIndex = currentWordIndex;
    const remainingWords = wordData.filter(
      (_, index) => index !== previousIndex
    );

    if (remainingWords.length > 0) {
      const newIndex = Math.floor(Math.random() * remainingWords.length);
      const newWord = remainingWords[newIndex];

      // 전체 wordData에서의 인덱스 찾기
      currentWordIndex = wordData.findIndex(
        (word) => word.word === newWord.word
      );
      currentWord = newWord.word;

      // 게임 보드 초기화
      resetGameBoard();
      // ... existing code ...
    } else {
      // 남은 단어가 없는 경우 - 모든 단어를 다시 사용 가능하게 설정
      currentWordIndex = Math.floor(Math.random() * wordData.length);
      currentWord = wordData[currentWordIndex].word;

      // 게임 보드 초기화
      resetGameBoard();
      // ... existing code ...
    }
  }

  // 다시 시작하기 버튼 이벤트 리스너 수정
  restartButton.addEventListener('click', () => {
    hideAllPopups();
    difficultyPopup.classList.add('show');
    correctCount = 0; // 맞힌 개수 초기화
  });
});
