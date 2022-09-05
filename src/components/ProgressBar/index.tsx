import {Progress} from 'antd';

export default function ProgressBar (props: any) {
    const { percent } = props;

    return <Progress percent={percent} />
}