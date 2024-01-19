// /**
//  *
//  * ChartLegends Component
//  *
//  */

// import { Row, Col } from 'antd';

// import './index.css';

// function ChartLegends({ data, ...restProps }) {
//     return (
//         <Row
//             gutter={16}
//             {...restProps}
//             className={`chart-legends ${restProps?.className}`}
//         >
//             {data.map((item) => (
//                 <Col key={item.color}>
//                     <span
//                         className="item-symbol"
//                         style={{ backgroundColor: item.color }}
//                     />
//                     <span className="item-label">{item.label}</span>
//                 </Col>
//             ))}
//         </Row>
//     );
// }

// export default ChartLegends;
