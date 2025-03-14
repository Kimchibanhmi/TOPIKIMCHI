/**
 * 베트남어 단어 학습 게임 데이터
 * TOPIK 1-2 수준의 단어들을 중심으로 구성
 */

const WORDS = {
  /**
   * 쉬운 난이도 (TOPIK 1-2 빈출 단어)
   */
  easy: [
    // 인간관계 (가족, 친구)
    {
      vietnamese: 'bạn',
      korean: '친구',
      vietnameseExample: 'Bạn tôi sống ở Hàn Quốc.',
      koreanExample: '내 친구는 한국에 살아요.',
    },
    {
      vietnamese: 'gia đình',
      korean: '가족',
      vietnameseExample: 'Gia đình tôi có bốn người.',
      koreanExample: '우리 가족은 네 명이에요.',
    },
    {
      vietnamese: 'bố',
      korean: '아버지',
      vietnameseExample: 'Bố tôi là giáo viên.',
      koreanExample: '제 아버지는 선생님이에요.',
    },
    {
      vietnamese: 'mẹ',
      korean: '어머니',
      vietnameseExample: 'Mẹ tôi nấu ăn rất ngon.',
      koreanExample: '엄마가 요리를 아주 맛있게 해요.',
    },
    {
      vietnamese: 'anh trai',
      korean: '오빠/형',
      vietnameseExample: 'Anh trai tôi học đại học.',
      koreanExample: '내 오빠는 대학교에 다녀요.',
    },
    {
      vietnamese: 'chị gái',
      korean: '언니/누나',
      vietnameseExample: 'Chị gái tôi thích âm nhạc.',
      koreanExample: '내 언니는 음악을 좋아해요.',
    },
    {
      vietnamese: 'em trai',
      korean: '남동생',
      vietnameseExample: 'Em trai tôi chơi bóng đá.',
      koreanExample: '내 남동생은 축구를 해요.',
    },
    {
      vietnamese: 'em gái',
      korean: '여동생',
      vietnameseExample: 'Em gái tôi học tiếng Hàn.',
      koreanExample: '내 여동생은 한국어를 공부해요.',
    },

    // 학교와 교육
    {
      vietnamese: 'trường học',
      korean: '학교',
      vietnameseExample: 'Trường học của tôi rất lớn.',
      koreanExample: '제 학교는 매우 커요.',
    },
    {
      vietnamese: 'học sinh',
      korean: '학생',
      vietnameseExample: 'Tôi là học sinh đại học.',
      koreanExample: '저는 대학생이에요.',
    },
    {
      vietnamese: 'giáo viên',
      korean: '선생님',
      vietnameseExample: 'Giáo viên tiếng Hàn rất tốt bụng.',
      koreanExample: '한국어 선생님은 매우 친절해요.',
    },
    {
      vietnamese: 'bài tập',
      korean: '숙제',
      vietnameseExample: 'Tôi làm bài tập mỗi ngày.',
      koreanExample: '저는 매일 숙제를 해요.',
    },
    {
      vietnamese: 'sách',
      korean: '책',
      vietnameseExample: 'Tôi đọc sách tiếng Hàn.',
      koreanExample: '저는 한국어 책을 읽어요.',
    },
    {
      vietnamese: 'bút',
      korean: '펜',
      vietnameseExample: 'Đây là bút của tôi.',
      koreanExample: '이것은 제 펜이에요.',
    },
    {
      vietnamese: 'từ điển',
      korean: '사전',
      vietnameseExample: 'Tôi dùng từ điển để học tiếng Hàn.',
      koreanExample: '저는 한국어를 공부하기 위해 사전을 사용해요.',
    },
    {
      vietnamese: 'sinh viên',
      korean: '대학생',
      vietnameseExample: 'Tôi là sinh viên đại học.',
      koreanExample: '저는 대학생이에요.',
    },
    {
      vietnamese: 'trường đại học',
      korean: '대학교',
      vietnameseExample: 'Tôi học ở trường đại học Seoul.',
      koreanExample: '저는 서울대학교에서 공부해요.',
    },

    // 시간 표현
    {
      vietnamese: 'thời gian',
      korean: '시간',
      vietnameseExample: 'Tôi không có nhiều thời gian.',
      koreanExample: '저는 시간이 많지 않아요.',
    },
    {
      vietnamese: 'ngày',
      korean: '날',
      vietnameseExample: 'Hôm nay là ngày đẹp.',
      koreanExample: '오늘은 좋은 날이에요.',
    },
    {
      vietnamese: 'tuần',
      korean: '주',
      vietnameseExample: 'Tuần sau tôi sẽ đi Seoul.',
      koreanExample: '다음 주에 서울에 갈 거예요.',
    },
    {
      vietnamese: 'tháng',
      korean: '월',
      vietnameseExample: 'Tháng này tôi rất bận.',
      koreanExample: '이번 달에 저는 매우 바빠요.',
    },
    {
      vietnamese: 'năm',
      korean: '년',
      vietnameseExample: 'Năm ngoái tôi học tiếng Hàn.',
      koreanExample: '작년에 한국어를 공부했어요.',
    },
    {
      vietnamese: 'hôm nay',
      korean: '오늘',
      vietnameseExample: 'Hôm nay thời tiết đẹp.',
      koreanExample: '오늘 날씨가 좋아요.',
    },
    {
      vietnamese: 'ngày mai',
      korean: '내일',
      vietnameseExample: 'Ngày mai tôi sẽ đi đến trường.',
      koreanExample: '내일 학교에 갈 거예요.',
    },
    {
      vietnamese: 'hôm qua',
      korean: '어제',
      vietnameseExample: 'Hôm qua tôi gặp bạn tôi.',
      koreanExample: '어제 친구를 만났어요.',
    },
    {
      vietnamese: 'buổi sáng',
      korean: '아침',
      vietnameseExample: 'Buổi sáng tôi uống cà phê.',
      koreanExample: '아침에 커피를 마셔요.',
    },
    {
      vietnamese: 'buổi chiều',
      korean: '오후',
      vietnameseExample: 'Buổi chiều tôi học tiếng Hàn.',
      koreanExample: '오후에 한국어를 공부해요.',
    },
    {
      vietnamese: 'buổi tối',
      korean: '저녁',
      vietnameseExample: 'Buổi tối tôi xem phim.',
      koreanExample: '저녁에 영화를 봐요.',
    },

    // 장소
    {
      vietnamese: 'nhà',
      korean: '집',
      vietnameseExample: 'Nhà tôi gần trường học.',
      koreanExample: '내 집은 학교 근처에 있어요.',
    },
    {
      vietnamese: 'phòng',
      korean: '방',
      vietnameseExample: 'Phòng tôi rất sạch sẽ.',
      koreanExample: '내 방은 매우 깨끗해요.',
    },
    {
      vietnamese: 'nhà hàng',
      korean: '식당',
      vietnameseExample: 'Nhà hàng này rất ngon.',
      koreanExample: '이 식당은 매우 맛있어요.',
    },
    {
      vietnamese: 'bệnh viện',
      korean: '병원',
      vietnameseExample: 'Bệnh viện ở gần nhà tôi.',
      koreanExample: '병원은 우리 집 근처에 있어요.',
    },
    {
      vietnamese: 'ngân hàng',
      korean: '은행',
      vietnameseExample: 'Tôi đi đến ngân hàng để gửi tiền.',
      koreanExample: '저는 돈을 예금하기 위해 은행에 가요.',
    },
    {
      vietnamese: 'cửa hàng',
      korean: '가게',
      vietnameseExample: 'Cửa hàng này bán đồ Hàn Quốc.',
      koreanExample: '이 가게는 한국 물건을 팔아요.',
    },
    {
      vietnamese: 'công viên',
      korean: '공원',
      vietnameseExample: 'Tôi thích đi bộ trong công viên.',
      koreanExample: '저는 공원에서 산책하는 것을 좋아해요.',
    },
    {
      vietnamese: 'thư viện',
      korean: '도서관',
      vietnameseExample: 'Tôi học ở thư viện.',
      koreanExample: '저는 도서관에서 공부해요.',
    },
    {
      vietnamese: 'ga tàu',
      korean: '역',
      vietnameseExample: 'Ga tàu gần nhà tôi.',
      koreanExample: '기차역은 우리 집 근처에 있어요.',
    },
    {
      vietnamese: 'siêu thị',
      korean: '슈퍼마켓',
      vietnameseExample: 'Tôi mua thức ăn ở siêu thị.',
      koreanExample: '저는 슈퍼마켓에서 음식을 사요.',
    },
    {
      vietnamese: 'đường',
      korean: '길',
      vietnameseExample: 'Đường này dẫn đến trường học.',
      koreanExample: '이 길은 학교로 이어져요.',
    },
    {
      vietnamese: 'công ty',
      korean: '회사',
      vietnameseExample: 'Tôi làm việc ở một công ty lớn.',
      koreanExample: '나는 큰 회사에서 일해요.',
    },
    {
      vietnamese: 'văn phòng',
      korean: '사무실',
      vietnameseExample: 'Văn phòng của tôi ở tầng 3.',
      koreanExample: '제 사무실은 3층에 있어요.',
    },

    // 감정과 상태
    {
      vietnamese: 'vui',
      korean: '기쁘다',
      vietnameseExample: 'Tôi rất vui khi gặp bạn.',
      koreanExample: '친구를 만나서 매우 기뻐요.',
    },
    {
      vietnamese: 'buồn',
      korean: '슬프다',
      vietnameseExample: 'Tôi buồn vì tôi không đậu kỳ thi.',
      koreanExample: '시험에 합격하지 못해서 슬퍼요.',
    },
    {
      vietnamese: 'mệt',
      korean: '피곤하다',
      vietnameseExample: 'Tôi rất mệt sau khi học.',
      koreanExample: '공부한 후에 매우 피곤해요.',
    },
    {
      vietnamese: 'khỏe',
      korean: '건강하다',
      vietnameseExample: 'Tôi cảm thấy khỏe hôm nay.',
      koreanExample: '오늘 건강하다고 느껴요.',
    },
    {
      vietnamese: 'bận',
      korean: '바쁘다',
      vietnameseExample: 'Tôi rất bận vào cuối tuần.',
      koreanExample: '주말에 매우 바빠요.',
    },
    {
      vietnamese: 'đói',
      korean: '배고프다',
      vietnameseExample: 'Tôi đói và muốn ăn cơm.',
      koreanExample: '배고파서 밥을 먹고 싶어요.',
    },
    {
      vietnamese: 'khát',
      korean: '목마르다',
      vietnameseExample: 'Tôi khát và muốn uống nước.',
      koreanExample: '목말라서 물을 마시고 싶어요.',
    },

    // 날씨와 계절
    {
      vietnamese: 'thời tiết',
      korean: '날씨',
      vietnameseExample: 'Thời tiết hôm nay rất đẹp.',
      koreanExample: '오늘 날씨가 매우 좋아요.',
    },
    {
      vietnamese: 'nóng',
      korean: '덥다',
      vietnameseExample: 'Hôm nay trời rất nóng.',
      koreanExample: '오늘은 날씨가 매우 더워요.',
    },
    {
      vietnamese: 'lạnh',
      korean: '춥다',
      vietnameseExample: 'Mùa đông ở đây rất lạnh.',
      koreanExample: '여기 겨울은 매우 추워요.',
    },
    {
      vietnamese: 'mưa',
      korean: '비',
      vietnameseExample: 'Hôm nay trời mưa nhiều.',
      koreanExample: '오늘 비가 많이 와요.',
    },
    {
      vietnamese: 'nắng',
      korean: '햇빛',
      vietnameseExample: 'Tôi thích ngày nắng.',
      koreanExample: '저는 햇빛이 있는 날을 좋아해요.',
    },
    {
      vietnamese: 'mùa xuân',
      korean: '봄',
      vietnameseExample: 'Mùa xuân ở Hàn Quốc rất đẹp.',
      koreanExample: '한국의 봄은 매우 아름다워요.',
    },
    {
      vietnamese: 'mùa hè',
      korean: '여름',
      vietnameseExample: 'Mùa hè ở đây rất nóng.',
      koreanExample: '여기 여름은 매우 더워요.',
    },
    {
      vietnamese: 'mùa thu',
      korean: '가을',
      vietnameseExample: 'Mùa thu là mùa yêu thích của tôi.',
      koreanExample: '가을은 제가 가장 좋아하는 계절이에요.',
    },
    {
      vietnamese: 'mùa đông',
      korean: '겨울',
      vietnameseExample: 'Mùa đông ở Seoul rất lạnh.',
      koreanExample: '서울의 겨울은 매우 추워요.',
    },

    // 음식과 음료
    {
      vietnamese: 'cơm',
      korean: '밥',
      vietnameseExample: 'Tôi ăn cơm mỗi ngày.',
      koreanExample: '저는 매일 밥을 먹어요.',
    },
    {
      vietnamese: 'nước',
      korean: '물',
      vietnameseExample: 'Tôi uống nhiều nước mỗi ngày.',
      koreanExample: '저는 매일 물을 많이 마셔요.',
    },
    {
      vietnamese: 'trà',
      korean: '차',
      vietnameseExample: 'Tôi thích uống trà vào buổi sáng.',
      koreanExample: '저는 아침에 차 마시는 것을 좋아해요.',
    },
    {
      vietnamese: 'cà phê',
      korean: '커피',
      vietnameseExample: 'Cà phê Hàn Quốc rất ngon.',
      koreanExample: '한국 커피는 매우 맛있어요.',
    },
    {
      vietnamese: 'rau',
      korean: '채소',
      vietnameseExample: 'Tôi ăn nhiều rau mỗi ngày.',
      koreanExample: '저는 매일 채소를 많이 먹어요.',
    },
    {
      vietnamese: 'trái cây',
      korean: '과일',
      vietnameseExample: 'Tôi thích ăn trái cây.',
      koreanExample: '저는 과일 먹는 것을 좋아해요.',
    },
    {
      vietnamese: 'thịt',
      korean: '고기',
      vietnameseExample: 'Thịt nướng Hàn Quốc rất ngon.',
      koreanExample: '한국 구이 고기는 매우 맛있어요.',
    },
    {
      vietnamese: 'bánh',
      korean: '빵',
      vietnameseExample: 'Tôi ăn bánh vào buổi sáng.',
      koreanExample: '저는 아침에 빵을 먹어요.',
    },

    // 교통 수단
    {
      vietnamese: 'xe buýt',
      korean: '버스',
      vietnameseExample: 'Tôi đi học bằng xe buýt.',
      koreanExample: '저는 버스로 학교에 가요.',
    },
    {
      vietnamese: 'tàu điện ngầm',
      korean: '지하철',
      vietnameseExample: 'Tàu điện ngầm ở Seoul rất thuận tiện.',
      koreanExample: '서울의 지하철은 매우 편리해요.',
    },
    {
      vietnamese: 'xe đạp',
      korean: '자전거',
      vietnameseExample: 'Tôi đi xe đạp đến công viên.',
      koreanExample: '저는 자전거를 타고 공원에 가요.',
    },
    {
      vietnamese: 'đi bộ',
      korean: '걷다',
      vietnameseExample: 'Tôi thích đi bộ vào buổi sáng.',
      koreanExample: '저는 아침에 걷는 것을 좋아해요.',
    },
    {
      vietnamese: 'đi',
      korean: '가다',
      vietnameseExample: 'Tôi đi đến trường học mỗi ngày.',
      koreanExample: '저는 매일 학교에 가요.',
    },
    {
      vietnamese: 'về',
      korean: '오다',
      vietnameseExample: 'Tôi về nhà vào buổi tối.',
      koreanExample: '저는 저녁에 집에 와요.',
    },

    // 색깔
    {
      vietnamese: 'màu sắc',
      korean: '색깔',
      vietnameseExample: 'Tôi thích màu sắc sáng.',
      koreanExample: '저는 밝은 색깔을 좋아해요.',
    },
    {
      vietnamese: 'màu đỏ',
      korean: '빨간색',
      vietnameseExample: 'Áo này màu đỏ.',
      koreanExample: '이 옷은 빨간색이에요.',
    },
    {
      vietnamese: 'màu xanh lá',
      korean: '초록색',
      vietnameseExample: 'Tôi thích màu xanh lá.',
      koreanExample: '저는 초록색을 좋아해요.',
    },
    {
      vietnamese: 'màu xanh dương',
      korean: '파란색',
      vietnameseExample: 'Bầu trời màu xanh dương.',
      koreanExample: '하늘은 파란색이에요.',
    },
    {
      vietnamese: 'màu vàng',
      korean: '노란색',
      vietnameseExample: 'Hoa này màu vàng.',
      koreanExample: '이 꽃은 노란색이에요.',
    },
    {
      vietnamese: 'màu đen',
      korean: '검은색',
      vietnameseExample: 'Tôi mặc áo màu đen.',
      koreanExample: '저는 검은색 옷을 입어요.',
    },
    {
      vietnamese: 'màu trắng',
      korean: '흰색',
      vietnameseExample: 'Tuyết màu trắng.',
      koreanExample: '눈은 흰색이에요.',
    },

    // 숫자
    {
      vietnamese: 'số',
      korean: '숫자',
      vietnameseExample: 'Tôi đang học các số tiếng Hàn.',
      koreanExample: '저는 한국어 숫자를 배우고 있어요.',
    },
    {
      vietnamese: 'một',
      korean: '하나',
      vietnameseExample: 'Tôi có một quyển sách.',
      koreanExample: '저는 책 한 권이 있어요.',
    },
    {
      vietnamese: 'hai',
      korean: '둘',
      vietnameseExample: 'Tôi có hai người bạn.',
      koreanExample: '저는 친구 두 명이 있어요.',
    },
    {
      vietnamese: 'ba',
      korean: '셋',
      vietnameseExample: 'Tôi học ba môn học.',
      koreanExample: '저는 세 과목을 공부해요.',
    },
    {
      vietnamese: 'bốn',
      korean: '넷',
      vietnameseExample: 'Có bốn người trong gia đình tôi.',
      koreanExample: '우리 가족은 네 명이에요.',
    },
    {
      vietnamese: 'năm',
      korean: '다섯',
      vietnameseExample: 'Tôi có năm quyển sách tiếng Hàn.',
      koreanExample: '저는 한국어 책 다섯 권이 있어요.',
    },
    {
      vietnamese: 'mười',
      korean: '열',
      vietnameseExample: 'Tôi học tiếng Hàn được mười tháng.',
      koreanExample: '저는 한국어를 열 달 동안 공부했어요.',
    },

    // 직업
    {
      vietnamese: 'bác sĩ',
      korean: '의사',
      vietnameseExample: 'Anh trai tôi là bác sĩ.',
      koreanExample: '제 오빠는 의사예요.',
    },
    {
      vietnamese: 'nhân viên',
      korean: '직원',
      vietnameseExample: 'Tôi là nhân viên công ty.',
      koreanExample: '저는 회사 직원이에요.',
    },
    {
      vietnamese: 'công việc',
      korean: '일',
      vietnameseExample: 'Công việc của tôi rất thú vị.',
      koreanExample: '제 일은 매우 재미있어요.',
    },

    // 기술과 취미
    {
      vietnamese: 'điện thoại',
      korean: '전화',
      vietnameseExample: 'Tôi gọi điện thoại cho bạn tôi.',
      koreanExample: '저는 친구에게 전화를 걸어요.',
    },
    {
      vietnamese: 'máy tính',
      korean: '컴퓨터',
      vietnameseExample: 'Tôi làm việc trên máy tính.',
      koreanExample: '저는 컴퓨터로 일해요.',
    },
    {
      vietnamese: 'thể thao',
      korean: '스포츠',
      vietnameseExample: 'Tôi thích chơi thể thao.',
      koreanExample: '저는 스포츠 하는 것을 좋아해요.',
    },
    {
      vietnamese: 'bóng đá',
      korean: '축구',
      vietnameseExample: 'Tôi chơi bóng đá vào cuối tuần.',
      koreanExample: '저는 주말에 축구를 해요.',
    },
    {
      vietnamese: 'bơi lội',
      korean: '수영',
      vietnameseExample: 'Tôi thích bơi lội vào mùa hè.',
      koreanExample: '저는 여름에 수영하는 것을 좋아해요.',
    },
    {
      vietnamese: 'nhạc',
      korean: '음악',
      vietnameseExample: 'Tôi nghe nhạc K-pop.',
      koreanExample: '저는 K-pop 음악을 들어요.',
    },
    {
      vietnamese: 'phim',
      korean: '영화',
      vietnameseExample: 'Tôi thích xem phim Hàn Quốc.',
      koreanExample: '저는 한국 영화 보는 것을 좋아해요.',
    },
    {
      vietnamese: 'đọc sách',
      korean: '독서',
      vietnameseExample: 'Tôi thích đọc sách vào buổi tối.',
      koreanExample: '저는 저녁에 책 읽는 것을 좋아해요.',
    },
    {
      vietnamese: 'du lịch',
      korean: '여행',
      vietnameseExample: 'Tôi muốn đi du lịch đến Hàn Quốc.',
      koreanExample: '저는 한국으로 여행 가고 싶어요.',
    },

    // 언어 학습
    {
      vietnamese: 'ngoại ngữ',
      korean: '외국어',
      vietnameseExample: 'Tôi đang học ngoại ngữ.',
      koreanExample: '저는 외국어를 배우고 있어요.',
    },
    {
      vietnamese: 'tiếng Hàn',
      korean: '한국어',
      vietnameseExample: 'Tôi học tiếng Hàn mỗi ngày.',
      koreanExample: '저는 매일 한국어를 공부해요.',
    },
    {
      vietnamese: 'từ',
      korean: '단어',
      vietnameseExample: 'Tôi học từ vựng tiếng Hàn.',
      koreanExample: '저는 한국어 단어를 공부해요.',
    },
    {
      vietnamese: 'câu',
      korean: '문장',
      vietnameseExample: 'Tôi viết câu tiếng Hàn.',
      koreanExample: '저는 한국어 문장을 써요.',
    },
  ],

  /**
   * 중간 난이도 (TOPIK 3-4 수준의 단어)
   */
  intermediate: [
    // 여기에 중간 난이도 단어들을 추가할 수 있습니다
  ],

  /**
   * 어려운 난이도 (TOPIK 5-6 수준의 단어)
   */
  advanced: [
    // 여기에 어려운 난이도 단어들을 추가할 수 있습니다
  ],
};
