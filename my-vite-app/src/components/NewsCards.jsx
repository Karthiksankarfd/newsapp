import React from "react";
import { Link } from "react-router-dom";
import alt from "../assets/alt.jpg";
const NewsCards = ({ data }) => {
  return (
    <ul className="list_item  grid grid-cols-1 lg:grid-cols-3 gap-6 px-20 mt-10">
      {data?.length > 0 ? (
        <>
          {data.map((item, index) => {
            return (
                
              <li key={index} className="bg-white rounded shadow p-4 hover:scale-110 transition-all ">
                <div className="newscard-container">
                  <img
                    src={item?.urlToImage || alt}
                    alt="imageloading"
                    className="w-full h-40 object-cover rounded"
                  />
                  <h1 className="title font-bold text-lg mt-2">{item?.title}</h1>
                  <p className="description text-sm mt-1">{item?.content}</p>
                  <div className="post-details flex items-center py-2 font-thin justify-between">
                    <span>Author : {item?.author || "No author"}</span>
                    <Link className="text-blue-400" to={item?.url}>
                      View Article
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </>
      ) : (
        <h1>No found related to your search</h1>
      )}
    </ul>
  );
};

export default NewsCards;
// author
// :
// "itsm_lady"
// content
// :
// ", , . . . \r\nvc.ru, 11 000 , , . , . . \r\n. , , .\r\n, , , ( ). \r\n . , . . \r\n« » . , , ITSM The TOGAF® Standard, Version 9.2.\r\n(, ), , .\r\n -, () , , .\r\n ISO/IEC 42 010 «Systems and Software Engineering-A… [+112 chars]"
// description
// :
// "Архитектура программного обеспечения — основа, от которой зависят качество, производительность и масштабируемость систем. В статье шаблон от экспертов в области архитектуры программного обеспечения с типовыми описаниями и примерами архитектурных представлений…"
// publishedAt
// :
// "2025-05-06T09:21:34Z"
// source
// :
// {id: null, name: 'Habr.com'}
// title
// :
// "Для архитекторов и аналитиков: шаблон описания архитектуры приложения (34 страницы пользы)"
// url
// :
// "https://habr.com/ru/articles/907154/#post-content-body"
// urlToImage
// :
// "https://habrastorage.org/getpro/habr/upload_files/d7c/9bf/f11/d7c9bff1168c82a77a2faa785035a531.png"
