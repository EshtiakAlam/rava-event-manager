import { useParams } from "react-router-dom";

const AdminEditLogistics = () => {
    const { item, _id } = useParams();

    console.log(`FIRST:`,item);
    console.log(`SECOND:`, _id);
    return (  
        <div className="AdminEventLogistics">
            <p>here</p>
        </div>
    );
}
 
export default AdminEditLogistics;