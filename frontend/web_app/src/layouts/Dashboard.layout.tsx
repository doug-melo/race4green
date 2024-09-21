/*----------------- IMPORTS -----------------*/

import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { MenuItem, menuItems } from "@/app/router";
import { icons } from "lucide-react";

/*-------------- INTERFACES --------------*/

interface NavMenuitemProps extends Omit<MenuItem, "selectCheck"> {
	selected: boolean;
}

interface NavMenuActionProps {
	icon: keyof typeof icons;
	label: string;
	onClick?: () => void;
}

/*-------------- SUBCOMPONENTS --------------*/

const NavMenuLink: React.FC<NavMenuitemProps> = ({
	icon,
	label,
	to,
	selected,
}: NavMenuitemProps) => {
	const Icon = icons[icon];

	return (
		<li
			className={[
				"flex items-center w-full gap-4 border-2 rounded-xl transition-all hover:bg-foreground/5",
				selected
					? "bg-foreground/5 border-primary text-primary-foreground"
					: "border-transparent",
			].join(" ")}
		>
			<Link
				to={to}
				className="flex items-center justify-center w-full gap-4 py-3 px-4 lg:justify-start"
			>
				<Icon className="h-6 w-6" />
				<span className="hidden lg:block">{label}</span>
			</Link>
		</li>
	);
};

const NavMenuAction: React.FC<NavMenuActionProps> = ({
	icon,
	label,
	onClick,
}: NavMenuActionProps) => {
	const Icon = icons[icon];

	return (
		<li className="flex items-center w-full gap-4 border-2 border-transparent rounded-xl transition-all hover:bg-foreground/5">
			<button
				className="flex items-center justify-center w-full gap-4 py-3 px-4 lg:justify-start"
				onClick={onClick}
			>
				<Icon className="h-6 w-6" />
				<span className="hidden lg:block">{label}</span>
			</button>
		</li>
	);
};

const NavMenu: React.FC = () => {
	const location = useLocation();

	return (
		<nav className="flex w-full">
			<ul className="flex w-full flex-col items-start font-medium gap-3">
				{menuItems.map((item, i) => (
					<NavMenuLink
						key={i}
						icon={item.icon}
						label={item.label}
						to={item.to}
						selected={item.selectCheck(location.pathname)}
					/>
				))}

				<NavMenuAction
					icon="LogOut"
					label="Sair"
					onClick={() => alert("TODO: Implement logout")}
				/>
			</ul>
		</nav>
	);
};

/*---------------- COMPONENT ----------------*/

const DashboardLayout: React.FC = () => {
	return (
		<div className="grid min-h-screen w-full sm:grid-cols-[100px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="border-r hidden sm:block">
				<div className="flex h-full max-h-screen flex-col gap-7 p-4 items-center lg:items-start">
					<a href="/" className="font-bold text-2xl">
						<span className="hidden lg:block pl-4">
							Race 4 Green
						</span>
						<span className="hidden sm:block lg:hidden">R4G</span>
					</a>
					<NavMenu />
				</div>
			</div>

			<main className="flex flex-1 flex-col p-4 lg:p-6">
				<Outlet />
			</main>
		</div>
	);
};

/*----------------- EXPORTS -----------------*/

export { DashboardLayout };