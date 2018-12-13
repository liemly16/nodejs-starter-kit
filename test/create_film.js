var models = require('../dist/models');
var controllers = require('../dist/controllers');
var moment = require('moment');

async function run() {
  // await models.Film.destroy({
  //   where: {
  //     created_at: {
  //       $gte: moment().add(-1, "years").format()
  //     }
  //   }
  // });
  let film = await models.Film.bulkCreate([
    {
      name: "Dumbo (2019)",
      start_time: moment().add(Math.floor(Math.random() * 5 + 5), "days").format(),
      description: 'Dumbo xuất hiện khi hai đứa trẻ Milly và Joe được bố Holt Farrier do thủ vai Colin Farrell dẫn đến tham quan rạp xiếc. Dumbo lẩn trốn trong một mớ rơm và được Holt Farrier tìm thấy. Đôi mắt ngây thơ cùng vẻ ngoài đáng yêu của Dumbo lần đầu xuất hiện khiến gia đình Hobbins thấy như một phép màu.',
      avatar: 'http://image.phimmoi.net/film/7852/poster.medium.jpg',
      trailer: 'http://www.phimmoi.net/phim/dumbo-chu-voi-biet-bay-7852/trailer.html',
      status: 'RELEASING'
    },
    {
      name: "Captain Marvel (2019)",
      start_time: moment().add(Math.floor(Math.random() * 5 + 5), "days").format(),
      description: `"Phim Captain Marvel lấy bối cảnh thập niên 90, với câu chuyện về nữ phi công Carol Danvers (Brie Larson). Captain Marvel sẽ mở đầu khi Carol đã trở thành siêu anh hùng, bị mất trí nhớ về thời thơ ấu và quãng thời gian còn ở Trái đất.
      Và một tai nạn khiến Carol trở về hành tinh quê hương, gặp gỡ Nick Fury (Samuel L. Jackson), cũng như tìm cách ngăn chặn tộc Skrull có khả năng biến hóa khôn lường, đội lốt thành kẻ khác.
      Thông tin thêm:
      Captain Marvel nhận được sức mạnh phi thường và được coi là Avenger mạnh nhất, người phụ nữ mạnh nhất vũ trụ Marvel và tất nhiên là một trong những chiến binh quả cảm nhất trong vũ trụ ấy.
      Sau đây là một số những năng lực “khủng” của cô, mọi người hãy so sánh xem liệu với nhưng năng lực này cô có thể chống lại Thanos được không nhé:
      Khả năng hấp thụ và chịu đựng các trạng thái bất lợi
      Captain Marvel có thể chịu đựng được các môi trường khắc nghiệt nhất trong vũ trụ như môi trường chân không ngoài không gian, lỗ đen hay độc tố khác thường.
      Cô có siêu sức mạnh và khả năng di chuyển siêu nhanh
      Sở hữu 2 loại năng lực phổ biến nhất trong thế giới siêu anh hùng, Captin Marvel có sức mạnh đáng sợ và khả năng di chuyển với tốc độ siêu thanh (nhanh gấp 6 lần tốc độ âm thanh). Trong trạng thái Binary, cô có thể di chuyển với tốc độ vượt qua cả tốc độ ánh sáng.
      Cảm quan cấp độ Vũ trụ
      Ngồi tại Trái Đất, Captain Marvel có thể cảm nhận được hết toàn bộ những gì xảy ra trong vũ trụ từ đó có thể chuẩn bị sẵn phương án tốt nhất để đối đầu với tình huống xấu nhất có thể xảy ra.
      Khả năng cận chiến cúa người lính và có thể lái được tất cả các loại phương tiện trên không"`,
      avatar: 'http://image.phimmoi.net/film/7399/poster.medium.jpg',
      trailer: 'http://www.phimmoi.net/phim/captain-marvel-7399/trailer.html',
      status: 'RELEASING'
    },
    {
      name: "The Shape of Water (2018)",
      start_time: moment().add(Math.floor(Math.random() * 5 + 5), "days").format(),
      description: `Người Đẹp & Thủy Quái là một chuyện tình không tưởng lấy bối cảnh trong thời kỳ Chiến Tranh Lạnh 1962. Làm việc cho viện nghiên cứu bí mật được bảo vệ nghiêm ngặt của chính phủ, Elisa cảm thấy trống vắng, cô đơn. Rồi cuộc đời cô gái thay đổi mãi mãi khi cô và cộng sự Zelda khám phá ra một vụ thí nghiệm kinh hoàng - tạo ra thủy quái lốt người!`,
      avatar: 'http://image.phimmoi.net/film/7087/poster.medium.jpg',
      trailer: 'http://www.phimmoi.net/phim/chan-nho-ban-o-dau-7087/trailer.html',
      status: 'RELEASING'
    },
    {
      name: "Smallfoot (2018)",
      start_time: moment().add(Math.floor(Math.random() * 5 + 5), "days").format(),
      description: `Sau lần chạm trán với Percy, một sinh vật với đôi chân bé nhỏ, người tuyết Migo quyết tâm thực hiện chuyến phiêu lưu của mình đến vùng đất xa xôi để chứng minh với cộng đồng của mình rằng Chân Nhỏ là có thật. Liệu Chân Nhỏ có thật sự đáng sợ như họ đã nghĩ? Hãy cùng Migo đi tìm sinh vật huyền bí này vào tháng 9 nhé!`,
      avatar: 'http://image.phimmoi.net/film/7087/poster.medium.jpg',
      trailer: 'http://www.phimmoi.net/phim/chan-nho-ban-o-dau-7087/trailer.html',
      status: 'RELEASING'
    },
    {
      name: "Aquaman (2018)",
      start_time: moment().add(Math.floor(Math.random() * 5 + 5), "days").format(),
      description: `"Sau những sự kiện trong Justice League, Arthur Curry/Aquaman trở về biển cả và bắt đầu đảm nhận quyền thừa kế vương quốc Atlantis dưới sự cố vấn của công chúa Mera. Thế nhưng, đế chế huyền thoại bao năm ẩn mình dưới lòng biển sâu Atlantics sắp phải dậy sóng khi Orm quyết tâm thu phục 7 chủng tộc nơi đáy đại dương để tiêu diệt toàn bộ sự sống trên mặt đất.
      Giữa lúc biển xanh cuộn trào những đợt sóng dữ dội nhất Aquaman sẽ đương đầu với mọi việc như thế nào để bảo vệ quê hương và thế giới?"`,
      avatar: 'http://image.phimmoi.net/film/7090/poster.medium.jpg',
      trailer: 'http://www.phimmoi.net/phim/aquaman-de-vuong-atlantis-7090/trailer.html',
      status: 'RELEASING'
    }
  ]);

}

run();