import {
  faCrown,
  faXmark,
  faChevronDown,
  faUser,
  faLock,
  faSignOut,
  faGauge,
  faUsers,
  faBars,
  faGamepad,
  faMoneyBill,
  faMoneyBillTransfer,
  faShoppingCart,
  faCircleInfo,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context/AuthContext";

function SidebarItemLink({ href = "/", title = "", Icon, nolink, onClick }) {
  const router = useRouter();
  function click_handle() {
    if (onClick) {
      onClick();
    }
  }

  if (nolink) {
    return (
      <li onClick={click_handle}>
        <Link href={href}>
          <a
            className={`${
              router.pathname === href
                ? "bg-gray-200"
                : "hover:bg-[#2a3744] hover:text-white"
            }`}
          >
            <h4>
              <FontAwesomeIcon icon={Icon} />
            </h4>
            <span>{title}</span>
          </a>
        </Link>
      </li>
    );
  }

  return (
    <li onClick={click_handle}>
      <Link href={href}>
        <a
          className={`${
            router.pathname === href
              ? "bg-gray-200"
              : "hover:bg-[#2a3744] hover:text-white"
          }`}
        >
          <h4>
            <FontAwesomeIcon icon={Icon} />
          </h4>
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
}

function SidebarItem({ title, children }) {
  return (
    <div className="sidebar_item overflow-hidden">
      <button className="ds_title" data-ref={title}>
        <span className="tracking-wider block">{title}</span>
        <span className="text-xs opacity-50 transition-all">
          <i className="fa-solid fa-chevron-up"></i>
        </span>
      </button>

      <ul className="ds_ul transition-all" data-ref={title}>
        {children}
      </ul>
    </div>
  );
}

const Sidebar = () => {
  const { logout } = useAuthContext();
  const [w_zero, set_w_zero] = useState(false);
  const sidebar_ref = useRef();

  function scroll_sidebar(e) {
    setTimeout(() => {
      console.dir(e);
      const sidebar = document.querySelector(".sidebar");
      sidebar.scrollTop = 1000;
    }, 100);
  }

  useEffect(() => {
    set_w_zero(true);

    // Sidebar Toggler
    const sidebar_toggler = document.getElementById("sidebar_toggler");
    const sidebar = document.getElementById("sidebar");
    const hide_sidebar = document.getElementById("hide_sidebar");
    if (sidebar_toggler && sidebar && hide_sidebar) {
      let open = true;
      function toggle() {
        open = !open;
        if (open) {
          sidebar.style.width = "250px";
          sidebar.style.minWidth = "250px";
        } else {
          sidebar.style.minWidth = "0px";
          sidebar.style.maxWidth = "0px";
          sidebar.style.width = "0px";
        }
      }
      sidebar_toggler.addEventListener("click", toggle);
      hide_sidebar.addEventListener("click", toggle);

      if (document.documentElement.clientWidth < 768) {
        open = !open;
        console.log("load");
      }
      window.addEventListener("resize", () => {
        if (document.documentElement.clientWidth < 1024) {
          open = !open;
          console.log("resize");
        }
      });
    }

    // Sidebar Item Toggler
    const all_ds_title = document.querySelectorAll(".ds_title");
    const all_ds_ul = document.querySelectorAll(".ds_ul");
    if (all_ds_title && all_ds_ul) {
      const heights = [];
      for (let i = 0; i < all_ds_ul.length; i++) {
        const ele = all_ds_ul[i];
        heights.push(ele.clientHeight);
        ele.style.height = ele.clientHeight + "px";
      }

      all_ds_title.forEach((title) => {
        let open = true;
        title.addEventListener("click", function () {
          const title_ref = this.dataset?.ref;

          const icon = this.children[1];
          if (open) {
            icon.style.transform = "rotate(90deg)";
          } else {
            icon.style.transform = "rotate(0deg)";
          }

          all_ds_ul.forEach((item, i) => {
            const item_ref = item.dataset?.ref;
            if (title_ref === item_ref) {
              if (open) {
                item.style.height = "0px";
              } else {
                item.style.height = heights[i] + "px";
              }
              open = !open;
            }
          });
        });
      });
    }
  }, []);

  return (
    <div
      ref={sidebar_ref}
      id="sidebar"
      style={{ zIndex: "100" }}
      className={`sidebar transition-all ${
        w_zero && "w-[0px] min-w-[0px]"
      } lg:min-w-[255px] lg:w-[255px] h-screen overflow-auto bg-white border-r shadow sidebar fixed lg:static inset-y-0 left-0 z-50`}
    >
      <div className="flex items-center justify-between px-4 gap-x-2 h-16 border-b shadow-sm sticky top-0 left-0 bg-white z-50">
        <button id="hide_sidebar" className="lg:hidden">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <Link href="/admin" className="flex items-center justify-start gap-x-2">
          <div className="cursor-pointer">
            <p className="flex items-center justify-center">
              <span className="font-semibold text-base text-blue-500">
                Ipsum
              </span>
              <span className="font-semibold text-base text-purple-600">
                Lorem.
              </span>
            </p>
          </div>
        </Link>
        <button></button>
      </div>

      <SidebarItem title="Others">
        <SidebarItemLink title="Test1" href="/admin/test1" Icon={faGauge} />
      </SidebarItem>

      <hr className="my-2" />

      <SidebarItem title="Others2">
        <SidebarItemLink title="Test2" href="/admin/test2" Icon={faGauge} />
      </SidebarItem>

      <hr className="my-2" />

      <SidebarItem title="Others3">
        <SidebarItemLink title="Test3" href="/admin/test3" Icon={faGauge} />
      </SidebarItem>
    </div>
  );
};

export default Sidebar;
