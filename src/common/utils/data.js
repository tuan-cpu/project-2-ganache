export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Trang chủ",
        link: ""
      },
      {
        name: "Thông tin cá nhân",
        link: "user_profile"
      }
    ],
  },

  {
    title: "Sự kiện gây quỹ",
    links: [
      {
        name: "Quỹ vĩnh viễn",
        link: "event/lifetime"
      },
      {
        name: "Quỹ khẩn cấp",
        link: "event/limited"
      },
      {
        name: "Quỹ của người dùng",
        link: "event/users"
      },
      {
        name: "Yêu cầu gây quỹ",
        link: "create/users"
      }
    ],
  },
  {
    title: "Bình chọn",
    links: [
      {
        name: "Đại sứ từ thiện",
        link: "vote_user"
      },
    ],
  },
  {
    title: "Khu giao dịch",
    links: [
      {
        name: "Chợ",
        link: "market"
      },
      {
        name: "Phòng đấu giá",
        link: "auction"
      },
      {
        name: "Giỏ hàng",
        link: "cart"
      }
    ],
  },
];

export const links_admin = [
  {
    title: "Sự kiện gây quỹ",
    links: [
      {
        name: "Danh sách sự kiện",
        link: "admin/list/event"
      },
      {
        name: "Tạo sự kiện",
        link: "admin/create_event"
      }
    ]
  },
  {
    title: "Quản trị database",
    links: [
      {
        name: "Người dùng",
        link: "admin/list/user"
      },
      {
        name: "Admin",
        link: "admin/list/admin"
      }
    ]
  },
  {
    title: "Giải quyết yêu cầu",
    links: [
      {
        name: "Xác thực thông tin",
        link: "admin/inquiry/verify_user_check"
      },
      {
        name: "Đăng kí gây quỹ",
        link: "admin/inquiry/user_event_register"
      },
      {
        name: "Rút tiền",
        link: "admin/inquiry/withdrawal_request"
      },
      {
        name: "Yêu cầu khác",
        link: "admin/inquiry/other_request"
      }
    ]
  },
  {
    title: "Các tính năng khác",
    links: [
      {
        name: "Bầu chọn người dùng",
        link: "admin/vote_management"
      },
      {
        name: "Quản lí quà tặng",
        link: "admin/lottery_management"
      },
      {
        name: "Quản lí chợ",
        link: "admin/market_management"
      },
      {
        name: "Quản lí phòng đấu giá",
        link: "admin/auction_management"
      }
    ]
  }
]

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];
export const donation_record_grid = [
  { field: "event_title", headerText: "Tên sự kiện", width: "120", textAlign: "Center" },
  { field: "amount", headerText: "Số lượng", width: "120", textAlign: "Center" },
  { field: "timestamp", headerText: "Thời điểm", width: "120", textAlign: "Center" },
]

export const auction_items = [
  {
    name: "First item",
    image: "https://th.bing.com/th/id/OIP.HTmQ9WaJ-BMCAt5oZPnXrgHaFj?pid=ImgDet&rs=1",
    lowestPrice: 0.01,
    lowestStep: 0.001
  },
  {
    name: "Second item",
    image: "https://th.bing.com/th/id/OIP.HTmQ9WaJ-BMCAt5oZPnXrgHaFj?pid=ImgDet&rs=1",
    lowestPrice: 0.015,
    lowestStep: 0.001
  },
  {
    name: "Third item",
    image: "https://th.bing.com/th/id/OIP.HTmQ9WaJ-BMCAt5oZPnXrgHaFj?pid=ImgDet&rs=1",
    lowestPrice: 0.02,
    lowestStep: 0.002
  },
]

export const fully_donated_items = [
  {
    name: "Tăm tre nhân đạo",
    image: "https://tranhgaoviet.vn/uploaded/files/tranh-gao/bai-viet/1487301712012_6233710.jpg",
    price: 0.001,
    items_per_pack: 5
  },
  {
    name: "Tranh sơn dầu",
    image: "https://nguoikhuyettathcm.org/wp-content/uploads/2020/05/tranh-4.jpg",
    price: 0.01,
    items_per_pack: 1
  },
  {
    name: "Tranh hoa đất sét",
    image: "https://nguoikhuyettathcm.org/wp-content/uploads/2020/05/TranhHoa-1.jpg",
    price: 0.01,
    items_per_pack: 1
  },
  {
    name: "Vòng đeo tay",
    image: "https://nguoikhuyettathcm.org/wp-content/uploads/2020/05/Kimhoan-2.jpg",
    price: 0.001,
    items_per_pack: 1
  },
  {
    name: "Móc chìa khóa nghệ thuật bằng gỗ",
    image: "https://nguoikhuyettathcm.org/wp-content/uploads/2013/11/Mynghe-1.jpg",
    price: 0.001,
    items_per_pack: 2
  }
]

export const partially_donated_items = [
  {
    name: "iPhone 14 Pro Max 256GB",
    image: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/t/_/t_m_20.png",
    price: 0.67,
    items_per_pack: 1,
    donated_percentage: 0.01
  },
  {
    name: "1 đôi dép",
    image: "https://th.bing.com/th/id/OIP.VnxYa641pWohwBnkc9KWHQHaHa?pid=ImgDet&rs=1",
    price: 0.002,
    items_per_pack: 1,
    donated_percentage: 0.05
  },
  {
    name: "Đồng hồ thông minh Amazfit GTS 4 Mini",
    image: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/2/_/2_208_1.png",
    price: 0.056,
    items_per_pack: 1,
    donated_percentage: 0.01
  }
]