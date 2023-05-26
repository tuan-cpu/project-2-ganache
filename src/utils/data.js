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
  { field: "event_id", headerText: "Event ID", width: "120", textAlign: "Center" },
  { field: "amount", headerText: "Số lượng", width: "120", textAlign: "Center" },
  { field: "timestamp", headerText: "Thời điểm", width: "120", textAlign: "Center" },
]