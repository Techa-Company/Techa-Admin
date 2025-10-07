import {
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
} from "@tabler/icons-react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ClipboardCheck,
  GraduationCap,
  Mail,
  Settings,
  FolderKanban,
  ShoppingBag,
} from "lucide-react";

export const sidelinks = [
  {
    title: "داشبورد",
    label: "",
    href: "/",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "مدیریت مستندات",
    label: "",
    href: "",
    icon: <FolderKanban size={18} />,
    sub: [

      {
        title: "لیست مستندات",
        label: "",
        href: "/docs",
        icon: <IconHexagonNumber1 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت دوره‌ها",
    label: "",
    href: "",
    icon: <BookOpen size={18} />,
    sub: [
      {
        title: "لیست دوره ها",
        label: "",
        href: "/courses",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "دسته بندی دوره ها",
        label: "",
        href: "/course-categories",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت دانشجویان",
    label: "",
    href: "",
    icon: <Users size={18} />,
    sub: [
      {
        title: "لیست دانشجویان",
        label: "",
        href: "/students",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تمرینات ارسالی",
        label: "",
        href: "/submitted-exercises",
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: "آزمون های ارسالی",
        label: "",
        href: "/submitted-quizzes",
        icon: <IconHexagonNumber3 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت تمرین ها",
    label: "",
    href: "",
    icon: <ClipboardCheck size={18} />,
    sub: [
      {
        title: "لیست تمرین ها",
        label: "",
        href: "/exercises",
        icon: <IconHexagonNumber1 size={18} />,
      },
    ],
  },
  {
    title: "آزمون‌ها",
    label: "",
    href: "",
    icon: <ClipboardCheck size={18} />,
    sub: [
      {
        title: "لیست آزمون‌ها",
        label: "",
        href: "/quizzes",
        icon: <IconHexagonNumber1 size={18} />,
      },
    ],
  },
  {
    title: "مدیریت گواهینامه‌ها",
    label: "",
    href: "/certificates",
    icon: <GraduationCap size={18} />,
  },
  {
    title: "مدیریت کاربران",
    label: "",
    href: "",
    icon: <Users size={18} />,
    sub: [
      {
        title: "لیست کاربران",
        label: "",
        href: "/users",
        icon: <IconHexagonNumber1 size={18} />,
      },
    ],
  },
  {
    title: "خرید ها",
    label: "",
    href: "/purchases",
    icon: <ShoppingBag size={18} />,
  },
  {
    title: "پیام‌ها",
    label: "",
    href: "/tickets",
    icon: <Mail size={18} />,
  },
  {
    title: "تنظیمات",
    label: "",
    href: "",
    icon: <Settings size={18} />,
    sub: [
      {
        title: "تنظیمات عمومی",
        label: "",
        href: "/settings/general",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "تنظیمات پنل کاربری",
        label: "",
        href: "/settings/user-panel",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
];
