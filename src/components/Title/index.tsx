export default function Title (props: any) {
    const { title } = props;
    return (
        <div className='title'>
            <h3>{title}</h3>
        </div>
    )
}