import {
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
} from "@tabler/icons-react";
import { Archive, Crown, FerrisWheel, Gift, Infinity, LayoutDashboard, Mail, Settings, TicketPercent, Trophy, Users } from "lucide-react";

export const sidelinks = [
  {
    title: "داشبورد",
    label: "",
    href: "/",
    icon: <LayoutDashboard size={18} />,
  },

  {
    title: "مدیریت امتیازات",
    label: "",
    href: "/apps",
    icon: <Trophy size={18} />,
  },
  {
    title: "قفسه جوایز",
    label: "",
    href: "",
    icon: <Gift size={18} />,
    sub: [
      {
        title: "ایجاد جایزه",
        label: "",
        href: "/prize-shelf/new",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "لیست جایزه ها",
        label: "",
        href: "/prize-shelf",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت پیامک ها",
    label: "",
    href: "",
    icon: <Mail size={18} />,
    sub: [
      {
        title: "گزارش پیامک ها",
        label: "",
        href: "/sms-management",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "خرید بسته",
        label: "",
        href: "/buy-sms",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "لیست هزینه ها",
        label: "",
        href: "/expenses",
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: "قالب پیامکی",
        label: "",
        href: "/sms-template",
        icon: <IconHexagonNumber4 size={18} />,
      },
    ],
  },
  {
    title: "کد های تخفیف",
    label: "",
    href: "/discount-code",
    icon: <TicketPercent size={18} />,
  },
  {
    title: "سناریوی فراموشی",
    label: "",
    href: "",
    icon: <Infinity size={18} />,
    sub: [
      {
        title: "لیست سناریو ها",
        label: "",
        href: "/forget-scenario",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تنظیم سناریوی فراموشی",
        label: "",
        href: "/forget-scenario/edit",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت مشتریان",
    label: "",
    href: "",
    icon: <Users size={18} />,
    sub: [
      {
        title: "سطح بندی مشتریان",
        label: "",
        href: "/customer-level",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "لیست مشتریان",
        label: "",
        href: "/customers",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "لیست خرید مشتریان",
        label: "",
        href: "/customer-shopping-list",
        icon: <IconHexagonNumber3 size={18} />,
      },
    ],
  },
  {
    title: "کمپین های فروش",
    label: "",
    href: "/sales-campaign",
    icon: <Crown size={18} />,
  },
  {
    title: "گردونه شانس",
    label: "",
    href: "/lucky-wheel",
    icon: <FerrisWheel size={18} />,
  },
  {
    title: "نظرسنجی",
    label: "",
    href: "/poll",
    icon: <Archive size={18} />,
  },
  {
    title: "تنظیمات",
    label: "",
    href: "",
    icon: <Settings size={18} />,
    sub: [
      {
        title: "بنر پنل مشتریان",
        label: "",
        href: "setting/banner",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تنظیمات پنل مشتریان",
        label: "",
        href: "/setting/setting",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
];