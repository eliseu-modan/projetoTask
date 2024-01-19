import { HomeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PUBLIC_ROOT_PATH } from '../../route/constants';

function ErrorPage({ route }) {
    const navigate = useNavigate();
    return (
        <Result
            {...route.page}
            extra={
                <Button
                    type="primary"
                    icon={<HomeOutlined />}
                    ghost
                    onClick={() => navigate(ROUTE_PUBLIC_ROOT_PATH)}
                >
                    Ir para o início
                </Button>
            }
        />
    );
}

export default ErrorPage;
