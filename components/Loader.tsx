import { Spinner } from "@heroui/react";
import { cn } from "@heroui/theme";
import { FunctionComponent } from "react";

interface LoaderProps {
	modal?: boolean,
	save?: boolean,
}

const Loader: FunctionComponent<LoaderProps> = ({ modal = false, save = false }) => {
	return (
		<div className={cn(" flex justify-center items-center", {
			['w-screen h-screen']: !modal,
			['w-full h-full py-10']: modal,
		})}>
			<div className="flex gap-3 items-center">
				<Spinner />
				<p>{save ? 'Сохранение...' : 'Загрузка...'}</p>
			</div>
		</div>
	);
};

export default Loader;
