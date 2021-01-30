import React, { useState, useEffect } from "react";
import { Container, Card, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { Table, Input, Button } from "../../components";
import { showToast, useStateCallback } from "../../utility/common";
import { constants } from "../../constants";
// import "../../styles/manageUsers.scss";

const ManageUsers = ({ getUsers, users, profile }) => {
  useEffect(() => {
    getUsers({ search: "", page: 1, is_active: true }).then((res) => {
      if (!res.status) {
        showToast(res.error_message);
      }
    });
  }, []);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useStateCallback(1);
  const [isButtonLoading, setButtonLoading] = useStateCallback(false);
  const onPageChange = (page) => {
    setPage(page, () =>
      getUsers({ search: searchValue, page: page, is_active: true }).then(
        (res) => {
          if (res.status) {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }
      )
    );
  };
  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearchUser = () => {
    setButtonLoading(true, () => {
      setPage(1);
      getUsers({ search: searchValue, page: 1, is_active: true })
        .then((res) => {
          if (!res.status) {
            showToast(res.error_message);
          }
          setButtonLoading(false);
        })
        .catch(() => setButtonLoading(false));
    });
  };

  const onAddUser = () => {
    router.push("/add-new-user");
  };
  const { items, totalItemCount, totalPages } = users;
  const {
    adminPlaceholder,
    buttons,
    headers,
    pageText,
    searchText,
    title,
    userPlaceholder,
  } = constants.manageUsers;
  return (
    <Container className="manage-users">
      <Card>
        <Card.Body className="pad-2">
          <Card.Title>
            <span>{title}</span>
            <div className="inline-heading-form">
              <Button
                label={buttons.add}
                onClick={onAddUser}
                className="add-btn left"
                prependIcon={true}
                iconClass="fas fa-plus"
              />
              <Form>
                <Input
                  controlId="findUsers"
                  placeholder={searchText}
                  name="dataPoint"
                  isControlled={true}
                  value={searchValue}
                  onChange={onSearchValueChange}
                  iconClass="fas fa-search"
                  isButtonDisabled={isButtonLoading}
                  onButtonClick={onSearchUser}
                  isLoading={isButtonLoading}
                  buttonVariant="success"
                  hasButton={true}
                  buttonType="submit"
                />
              </Form>
            </div>
          </Card.Title>
          <Table
            activePage={page}
            countText={pageText}
            pageCount={totalPages}
            totalItemsCount={totalItemCount}
            headers={headers}
            onPageChange={onPageChange}
          >
            {items &&
              items.length > 0 &&
              items.map((item, index) => {
                return (
                  <tr>
                    <td>{(page - 1) * 10 + index + 1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <i className="fas fa-envelope" />
                      {item.email}
                    </td>
                    <td>
                      <i className="fas fa-user" />
                      {item.is_admin ? adminPlaceholder : userPlaceholder}
                    </td>
                    <td>
                      {profile && profile.id !== item.id && (
                        <Link
                          href={{
                            pathname: `/edit-user/${item.id}`,
                            query: { user: JSON.stringify(item) },
                          }}
                          as={`/edit-user/${item.id}`}
                        >
                          <a className="action edit">
                            <i
                              className="fas fa-pencil-alt"
                              // onClick={() => onEditUser(item)}
                            />
                          </a>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageUsers;
