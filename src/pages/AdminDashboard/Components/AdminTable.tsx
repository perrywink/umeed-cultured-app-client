import { Post } from "../../../types/Post";

interface Props {
  tabData: [];
}

const AdminTable = ({ tabData }: Props) => {
  const tableContent = tabData || [];

  return (
    <div>
      {tableContent.map((content: Post) => (
        <div className='grid md:grid-cols-5'>
          <div>
            <h3> {content.title}</h3>
          </div>
          <div>
            <h3> {content.author}</h3>
          </div>
          <div>
            <h3> {content.status}</h3>
          </div>

          {content.status == "REJECTED" && (
            <div>
              <button> {"Manage"}</button>
            </div>
          )}

          {content.status == "IN_REVIEW" && (
            <div className='grid md:grid-cols-2'>
              <div>
                <button> {"Accept"}</button>
              </div>

              <div>
                <button> {"Reject"}</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminTable;
