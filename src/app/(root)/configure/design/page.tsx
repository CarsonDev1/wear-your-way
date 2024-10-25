interface PageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

const Page = async ({ searchParams }: PageProps) => {
	const { id } = searchParams;
	return (
		<div>
			<p>{id}</p>
		</div>
	);
};

export default Page;
