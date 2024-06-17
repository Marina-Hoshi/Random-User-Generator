$(document).ready(function() {
  // 年齢に基づいてレコメンド画像を選択する関数
  function getRecommendationImage(age) {
    // 年齢別のレコメンド画像の配列を定義
    const recommendations = [
      { ageRange: [20, 29], image: 'img/protein.jpg' },
      { ageRange: [30, 39], image: 'img/smoothie.jpg' },
      { ageRange: [40, 49], image: 'img/berry.jpg' },
      { ageRange: [50, 59], image: 'img/nuts.jpg' },
      { ageRange: [60, 69], image: 'img/cheese.jpg' },
      { ageRange: [70, 80], image: 'img/yogurt.jpg' }
    ];

    // 年齢に応じたレコメンド画像を選択して返す
    const recommendation = recommendations.find(rec => age >= rec.ageRange[0] && age <= rec.ageRange[1]);
    return recommendation ? recommendation.image : '';
  }

  // 年齢に基づいてレコメンドテキストを選択する関数
  function getRecommendationText(age) {
    // 年齢別のレコメンドテキストの配列を定義
    const recommendations = [
      { ageRange: [20, 29], text: 'Protein' },
      { ageRange: [30, 39], text: 'Smoothies' },
      { ageRange: [40, 49], text: 'Berries' },
      { ageRange: [50, 59], text: 'Nuts' },
      { ageRange: [60, 69], text: 'Cheese' },
      { ageRange: [70, 80], text: 'Yogurt' }
    ];

    // 年齢に応じたレコメンドテキストを選択して返す
    const recommendation = recommendations.find(rec => age >= rec.ageRange[0] && age <= rec.ageRange[1]);
    return recommendation ? recommendation.text : '';
  }

  $('#c-generate__btn').click(function() {
    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function(data) {
        // ユーザー情報を取得
        const user = data.results[0];
        // ユーザー情報をHTMLに表示
        $('#c-user__info').html(`
          <img src="${user.picture.large}" alt="顔写真">
          <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <p><strong>Age:</strong> ${user.dob.age}</p>
          <p><strong>Username:</strong> ${user.login.username}</p>
          <p><strong>Address:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Cell:</strong> ${user.cell}</p>
          <p><strong>Nationality:</strong> ${user.nat}</p>
        `);

        // 年齢に基づいてレコメンド画像を取得し、コンソールに出力
        const recommendationImage = getRecommendationImage(user.dob.age);
        const recommendationText = getRecommendationText(user.dob.age);

        // 年齢に基づいてレコメンド画像とテキストを取得し、HTMLに表示
        $('#c-recommendation').html(`
          <p><strong>Recommend Health Food</strong>: ${recommendationText}</p>
          <img src="${recommendationImage}" alt="Recommendation Image">
        `);
      },

      error: function() {
        // エラーが発生時に表示するメッセージ
        $('#c-user__info').html('<p>エラーが発生しました</p>');
      }
    });
  });
});
