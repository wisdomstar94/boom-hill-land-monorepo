type MenuItem = {
  label: string;
  href: string;
};

export type TestWebLayoutMenuNavBarProps = {
  menuItems: Array<MenuItem>;
  onMenuItemClick: (item: MenuItem) => void;
  pathname: string;
};

export function TestWebLayoutMenuNavBar(props: TestWebLayoutMenuNavBarProps) {
  const { menuItems, onMenuItemClick, pathname } = props;

  return (
    <div className="w-full flex flex-wrap gap-2 items-start justify-start relative">
      {menuItems.map((item) => (
        <button
          key={item.href}
          onClick={() => onMenuItemClick(item)}
          type="button"
          data-selected={item.href === pathname}
          className="text-sm inline-flex px-2 py-0.5 rounded-md border border-gray-400 hover:bg-gray-100 cursor-pointer data-[selected=true]:bg-gray-800 data-[selected=true]:text-white data-[selected=true]:hover:bg-gray-900"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
