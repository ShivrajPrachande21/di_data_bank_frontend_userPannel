import React from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import flag from '../../../../assets/images/flag.png';
import './viewJobdescription.css';
import Applications from './../../../../company-pannel/pages/create_job/viewJobApplication/applications/Applications';
const ViewJobDescription = () => {
    const navigate = useNavigate();
    return (
        <>
            <p onClick={() => navigate(-1)}>back</p>

            <div className="view-job-description">
                <Row>
                    <Col>
                        <div className="search-job-top">
                            <Image
                                // src={avatar}
                                roundedCircle
                                alt="Profile"
                                width="40" // Set the desired width
                                height="40" // Set the desired height
                            />
                            <h6>
                                UI UX Designer{' '}
                                <p
                                    style={{
                                        color: '#3B96E1',

                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() =>
                                        navigate('/view-company-desc')
                                    }
                                >
                                    Amazon
                                </p>
                            </h6>
                            <div className="green-thik">
                                <img src={flag} alt="" height="20px" />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="veiw-skills">
                            <p>User Experience designer</p>
                            <p>Prototyping</p>
                        </div>
                        <table style={{ cursor: 'pointer' }}>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Experience:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        Years
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Loction:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span"></span>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Salary:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">LPA</span>
                                </td>
                            </tr>

                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Qualification:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span"></span>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Openings:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">2</span>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Applications:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        days ago
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        paddingRight: '30px'
                                    }}
                                >
                                    <span className="card-table-span">
                                        Poasted:
                                    </span>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <span className="card-table-span">
                                        days ago
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <div
                            className="search-job-bnt mt-2"
                            // onClick={handleNavigate}
                        >
                            <Button
                                size="sm"
                                style={{
                                    background: 'white',
                                    color: '#3B96E1',
                                    border: '1px solid #3B96E1'
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                size="sm"
                                style={{
                                    background: '#B4DDFF',
                                    color: '#3B96E1',

                                    border: 'none'
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                        <p
                            style={{
                                color: '#051F50',
                                fontWeight: '500',
                                marginTop: '8px'
                            }}
                        >
                            Job Description
                        </p>
                    </Col>
                </Row>
                <Row>
                    <div className="job-description-view">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Incidunt quae, consectetur veritatis eius rerum
                        corporis sed iusto, eligendi explicabo voluptate hic
                        maxime, fugiat quis ipsam asperiores! Inventore quaerat
                        tenetur dicta maxime obcaecati mollitia excepturi.
                        Adipisci molestiae quia velit omnis praesentium dolor
                        cumque veniam exercitationem veritatis, blanditiis
                        reiciendis harum eveniet animi nesciunt est ipsam quae
                        quaerat officia, numquam necessitatibus et ab sequi! At
                        dolore deserunt, reiciendis atque hic iusto maiores
                        placeat tempore exercitationem, inventore, dolorum
                        aliquam. Adipisci, at. Amet quos possimus nisi eligendi
                        corporis mollitia assumenda, aliquid, maiores tenetur
                        laboriosam ipsa, minima illo. Sunt molestias illum
                        maiores quasi incidunt error! Officia tempora beatae ut
                        obcaecati provident sit tempore a, fugit dolorem nisi
                        sed inventore iure eum ea quod praesentium voluptatem
                        voluptas laboriosam, cupiditate necessitatibus quos
                        aperiam doloremque veritatis pariatur! Officiis placeat
                        quaerat, accusantium, veritatis nam illo assumenda id
                        ratione reprehenderit consequatur iure sunt omnis eius
                        saepe voluptatum necessitatibus odio laudantium facilis,
                        modi blanditiis cupiditate culpa! Cupiditate consectetur
                        itaque dignissimos quibusdam, magnam numquam vel maiores
                        placeat? Praesentium, recusandae nam porro dolore quod
                        necessitatibus ea ipsa, facere ipsam nobis reprehenderit
                        laboriosam sunt blanditiis repudiandae dignissimos
                        suscipit nemo cupiditate voluptatem odio laborum, quis
                        optio a mollitia eaque. Numquam quaerat reiciendis
                        laboriosam quis culpa blanditiis, velit ratione,
                        inventore, exercitationem facilis hic. Eius, numquam
                        consequatur adipisci omnis mollitia in voluptate magnam.
                        Voluptate qui aperiam eius deserunt error temporibus
                        eligendi et commodi, eveniet autem unde accusamus modi
                        voluptas reprehenderit. Nostrum eos quos cum possimus
                        facere quisquam excepturi velit qui, pariatur laudantium
                        similique laborum dicta. Nesciunt error cum
                        perspiciatis! Ducimus, quam! Ullam iusto, eligendi ab
                        adipisci nisi distinctio blanditiis quo veritatis quae
                        praesentium exercitationem iure explicabo expedita sint?
                        Maxime, impedit! Aut non atque et quidem ab dolore
                        quisquam esse, eos porro ipsa ea ex beatae blanditiis
                        aperiam ad, ducimus accusantium quas deleniti odio eum
                        dolorem quos molestias natus! Consequuntur dignissimos
                        molestias repellat laborum perferendis, iusto sunt,
                        praesentium iure impedit cum sit sequi sed, eaque natus
                        est voluptates quo voluptatum inventore quis rem ex
                        debitis id. Veniam eligendi ducimus soluta nam nostrum
                        nobis mollitia. Laudantium quia nam repellendus
                        voluptatibus doloribus sed cum nesciunt minus aliquid
                        ratione at accusamus tenetur aut nostrum quibusdam ab
                        aliquam tempore praesentium quaerat doloremque,
                        distinctio eaque quo enim ad! Cum aut cupiditate
                        reiciendis laborum obcaecati minus distinctio suscipit
                        commodi a id cumque culpa quam iste quia saepe accusamus
                        vero quos ad, natus vitae voluptatibus itaque autem quo
                        numquam. Eligendi praesentium ipsum enim repudiandae
                        voluptates. Quae placeat, blanditiis quam facere nisi
                        assumenda hic nulla accusamus necessitatibus sunt alias,
                        repellendus delectus quaerat ipsam. Magni recusandae
                        quis harum impedit. Quae corrupti id dolorem optio
                        voluptatibus. Ratione quas iste, et fugit blanditiis
                        officiis qui perspiciatis nulla officia, rerum magni
                        quod provident! Odit repellat modi rerum eligendi sint
                        hic. Asperiores similique quaerat laboriosam
                        praesentium, porro quas fuga consequatur voluptatum modi
                        reprehenderit omnis dicta, aspernatur sequi ad
                        architecto expedita doloremque earum adipisci nemo alias
                        labore a laborum eius? Exercitationem aliquam culpa sunt
                        nemo, labore excepturi, eius corrupti placeat ratione
                        esse ut veniam adipisci, id aut obcaecati ea illum
                        accusamus reiciendis optio dolorem? Similique nisi
                        laudantium officiis iure pariatur, natus quis vel iusto
                        illum corrupti iste modi delectus nesciunt dolor. Iste a
                        fuga maiores deleniti hic totam adipisci quasi! Pariatur
                        ipsam recusandae fugit culpa dolore beatae nihil
                        possimus facere voluptas, quis excepturi labore placeat
                        sint suscipit. Animi perspiciatis modi beatae itaque
                        quod? Esse enim dicta saepe magnam velit, similique
                        nobis, facilis corrupti assumenda laudantium suscipit
                        consequuntur beatae quam recusandae doloribus doloremque
                        nisi odio porro? Magni obcaecati esse quis, beatae
                        eligendi necessitatibus assumenda soluta, in quos vero
                        delectus recusandae sequi animi dolore, harum veniam
                        adipisci. Reiciendis iste atque explicabo sunt
                        exercitationem, perspiciatis ipsam numquam, fugiat modi
                        ullam beatae incidunt neque sint ad quas tenetur
                        voluptatibus placeat quos rem laudantium. A dolor quidem
                        et rem molestias. Doloribus est, consequuntur facere,
                        reiciendis minus, quae et libero deleniti nam deserunt
                        error perferendis. Ea laudantium voluptatum fuga
                        obcaecati? Iure eius fugit distinctio fuga soluta at
                        voluptatibus laborum corrupti obcaecati itaque minima
                        consequatur ratione tenetur provident sequi alias,
                        mollitia quis magni sunt ea inventore delectus?
                        Voluptatibus, incidunt laboriosam pariatur alias ducimus
                        odio aspernatur a delectus beatae ipsam, eaque illum?
                        Enim quod ab, modi excepturi temporibus rerum. Nemo
                        facere nostrum reprehenderit maxime architecto velit
                        quidem dolor repellat ullam ad perspiciatis, assumenda
                        nam sequi magnam consequatur ipsum quis? Amet, sequi,
                        aperiam dolore error totam pariatur officiis dolorem
                        sed, cumque excepturi earum! Atque pariatur reiciendis
                        earum, facere quae voluptates nam, expedita impedit
                        nulla qui magni dolorum! Porro consectetur quibusdam sed
                        dignissimos voluptate assumenda dolorem minus alias.
                        Hic, impedit soluta libero officia, a accusantium neque,
                        vel placeat eum rem qui magnam atque corporis molestiae!
                        Mollitia iste ea quibusdam distinctio ipsa possimus,
                        voluptatem molestias omnis blanditiis expedita cumque
                        accusamus praesentium ad nostrum quae! Sequi, unde
                        commodi ipsa vel natus distinctio, tempora sit nihil
                        reprehenderit obcaecati consectetur rerum voluptatem
                        veniam alias at corrupti maiores sint tempore molestiae
                        numquam? Neque nihil accusamus eaque earum, odio fuga
                        corporis dolores! Doloremque eligendi tenetur natus,
                        totam omnis nisi nesciunt impedit similique laborum
                        delectus itaque quod quaerat eos autem tempore voluptate
                        eius doloribus molestias maiores aliquid asperiores
                        dolores in. Tenetur, vero iste qui quo praesentium
                        similique reiciendis ut quasi provident cumque natus
                        totam ipsam facere, vitae distinctio quas fugit magnam
                        temporibus recusandae ea accusamus dolor ab eaque? Sed
                        veniam quisquam aliquam? Doloremque necessitatibus
                        consequatur eveniet odit. Molestias dolore assumenda
                        fuga veniam neque amet debitis corrupti impedit officia
                        excepturi placeat quis modi, sed tempora ullam ut! Illo
                        deserunt neque assumenda rerum molestiae ipsum, dolore,
                        placeat libero consequuntur odio inventore nostrum
                        recusandae, beatae suscipit? Quos libero nemo ratione,
                        unde reiciendis tempore? Maiores, blanditiis. Velit
                        eius, consequuntur minus, possimus molestiae explicabo,
                        repellendus dolores hic enim est fugit accusamus
                        adipisci laborum commodi quia beatae totam cumque rerum
                        ratione dignissimos reiciendis quae dolorum! Qui tempore
                        sed porro cupiditate in? Sint pariatur repellat, quam
                        doloremque dolores suscipit voluptate cupiditate
                        praesentium! Necessitatibus eos dignissimos reiciendis
                        blanditiis similique, minus error beatae illo velit
                        deleniti corrupti amet molestias. Ullam, pariatur quae a
                        magnam laudantium, ut non vel autem dolor soluta,
                        veritatis asperiores at laboriosam praesentium eveniet
                        earum labore.
                    </div>
                </Row>
            </div>
        </>
    );
};

export default ViewJobDescription;
