import React, { useEffect, useState } from "react";
import Courses from "./Student.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const TopCourses = ({ sendDataToparent }) => {
  const [Courses, setCourses] = useState([]);
  const [DataTosend, setDatatosend] = useState("");
  const sendDataToParentHandler = () => {
    sendDataToparent(DataTosend);
  };
  useEffect(() => {
    displayallCourses();
  }, []);
  const displayallCourses = async () => {
  
    try {
      const alltopcoursesResponse = await fetch(
        "http://localhost:5000/api/v1/course/alltopcourses"
      );
      // const jsondata = await alltopcoursesResponse.json();
      //  console.log(jsondata)
      // setCourses(jsondata.allCourses);
      // Courses.forEach((course) => {
      //   console.log("Course ID:", course._id);
      //   console.log("Course Name:", course.courseName);
      //   console.log("Course Description:", course.courseDescription);
      //   console.log("Instructor Name:", course.Instructor.name);
      //   console.log("Price:", course.price);
      //   console.log("Students Enrolled:", course.studentsEnrolled);
      //   console.log("Thumbnail URL:", course.thumbnail);
      // });
      // console.log(Courses);
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  };
  
  const TopCoursescard = (props) => {
    const [orderId, setOrderId] = useState(null);
  
  
    const handlePayment = async () => {
      try {
        const response = await axios.post('http://localhost:5000/create-order', {
          amount: 99900, // Replace with your dynamic amount if needed
          currency: 'INR',
          receipt: 'order_rcptid_' + Math.random().toString(36).substring(2, 15), // Generate a random receipt ID
        });
  
        setOrderId(response.data.id);
      } catch (error) {
        console.log("something wrong happened")
      }
    };
  
    useEffect(() => {
  
      if (orderId) {
        const options = {
          "key": process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID from environment variable
          "amount": 99900, // Use the order ID as the amount for Razorpay checkout
          "currency": "INR",
          "name": "EduHome", // Replace with your company name
          "description": "Payment for your purchase",
          "image": "https://your-company-logo.com/logo.png", // Replace with your company logo URL (optional)
          "prefill": {
            "name": "Customer Name", // Replace with a way to get customer name (optional)
            "email": "customer@example.com", // Replace with a way to get customer email (optional)
          },
          "theme": {
            "color": "#3399cc", // Customize the checkout button color (optional)
          },
          "handler": function (response) {
            console.log(response); // Handle payment response (success or failure)
            // You can update your order status or handle other actions based on response
  
            // Example check for successful payment:
            if (response.razorpay_payment_id) {
              alert("payment successful");
              // Payment successful!
              // Send a confirmation email or update order status in your backend
            } else {
              // Payment failed
              // Handle payment failure scenario (e.g., display error message)
            }
          },
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    }, [orderId]);
  
    const [enrolledstudents, setEnrolledstudents] = useState(1);

    return (
      <>
        <div className="text-white w-[250px] h-[350px] sm:w-[380px] sm:h-[350px]  mx-[50px] border-[3px] rounded-[30px] border-green-500 flex flex-col flex flex-col items-center justify-center   ">
          <div className="text-white teacher text-[25px]">John Doe</div>
          <div className="text-white thumbnailsection flex justify-center items-center">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSExMVFhUVFhUVFhcYFxUaFRcWFxUXFxcaFxgYHSggGBolGxUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKMBNgMBEQACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABAUGAQIDBwj/xABIEAACAQMBBQUEBQkGAwkAAAABAgMABBEhBRIxQVEGEyJhcTKBkaEHFEKx0SMzUmJygpLB8CRjorLC4RZD0hU0NURTc4O08f/EABsBAQACAwEBAAAAAAAAAAAAAAABAgMEBQYH/8QAOREAAgEDAgQDBgQGAgIDAAAAAAECAwQRITEFEkFRE2FxIjKBkaHBFCOx0QYzUuHw8SRCFRY0cqL/2gAMAwEAAhEDEQA/APkdbZhFAKAUAoBQCgFAKAUAoBQCgFAKAUAoDhmA4mgNLEBsxQ7AG+dQ0akZFojDKyOD/wCYYEFVPsAgnUgCu/oTsRNibGe6YyOW3MksxJLO2cnBPE54tXPvuIRt1yx1l+h1uG8KndPmlpDv39DawxrGoRAFUcAK8rUnKrLmk8s9pTpwowUILCR4XV2EGScCstGhKo+WKMFxcwpR5pvCM5tDajvkL4V+Z9/KvRWvDYUvanqzyd7xepWzGnpH6lSwrpHGK+aUhiBwFRgGuj7CXrwJcRLHMrqGxG4LDOuCGwCfQ0GOxnru3eFtyVGRv0XUq3wYa0wDzFQTkUGT1jmahKZLhuanJOSSJ6nJJy0mRxqSCueBgeOfvqGiD2SPHOgwc5oSeTNQHmy9agg8ytQQRaygUAoBQCgFAKAUAoBQCgFAKAUAoBQCgPsP0MbZsrG0lkumSFpZ2CSPjMqJHHlU5kKzHPLL9axVE29C8djGXNlHtC+ubmMMts8zuuchnycnGdRk5J6Zxx4aF/fK2hyR95/Q6vC+GO6nzy9xfXyNFgKAAAABgAcAK8s25vL3PapRguWKwkQL28CDz5Ct20s515YW3VnNvr+FvHL36IobmRnOW/2HpXqKFvCjHEUeNubqpcS5psiSLWY1iLIagqVZOWPrSJJP2ZtCa3bfhleM8yrEZ9RwPvq4wfQNndtZ2gl+vR286xbuYpV3J3Dc1BBB08h61DiiSzvOxuyrqMywTfV8AMxVw8SZGfECfCPQrVWmMIzO0fo2vIhvxblynENGw3iP2WP3E1Ax2Ms6lWKMCrKcMrAhgehB1FRghHbdoXOwyKEHdZKnIO+/TJJ1MlMg6nzqMkHBNCTqaA6kUBBrKVFAKAUAoBQCgFAKAUAoBQCgFAKAUBI2fZvcSxwxjLyusa9MsQAT5DOT5A0bwC82ggvboQwH+zW6iGI/3SE70nTekcs+f1/KtS6uY29Jze/T1N2ys5XVZU1tu35GsiiWNQijCqMAV42c5VJOUnqz39OnGjBQgsJEO9uQo+7zrbs7WVefKviaN9eRt6fM/gvMpHcscmvXUqMaUeWOx4etXnWm5z3OjLWTBiI8q1DIK64FVKsq0qUSWOxrUTTJGZFi3ifG3sqQCRn3jHqRUok+kdpOw7XM4YXJZxbCVy6rlsEhQioBgcevLjTmC0MxszYu0bdSyQuizYgfwhshuJ3RkkAZO8POpyW0IclxPs6Zkt7k+EjxRnwE4BOVOQSDoePCqjlRS3txJPOZZGLSOcs2mScActOAqrRVkiHOD5UCO4lFQTk4Z80ICoTQHp3WlSDzJIqCcnIaoJyCaA671AQazFRQCgFAKAUAoBQCgFAKAUAoBQCgFAXvZI7jXFxwNvaTuh6SOFgQ+oM2fdUS6IlGh7L7O7iAEjxPhm8hjwj3D5k15Hilz41bC2WiPdcGs/w9um/elq/siwnetGCOjOWCu7D20e0r+QSrvxRRkKuTjJbG9pz4/KvYcPoeDT13e54Pid1+IrZ6LRGxvfo3gbWGWSM9D41/xa/Ot7mOelqZ3aPYO9iyVCTD9Q4b+FvxqdCcMy20LeSE4lR4z+upX4E6H3UaKt4Kq7OhrG0QVCmoROCfsyVFljaQMUDKWCnDFQdcHrViT692L27c39xcEjEPd7sLPHhyu8RowwGxz93vhhLUuz2g+rS29reEd8wZleNG3GxlQN3Ugn4aUxnVE5xufG+1U0T3MhijZAGYMGzkuGbebB1XPSjLIqLYZkHvqCr3LCFPa9aBEZ46YKnpClQCUqUJO0pCrknA86kIq5toryBPyFVbJIj7QbkAPjVck4OY788xmmRgnwzqw009akgh1mIFAKAUAoBQCgFAKAUAoBQCgFAKAUBpuxNv3wu4f07dG/djurdn/wAOa1rup4dJz7JmzZUlVrxg+rRr2rxGcn0fZFNt+4KQyMOO7gep0H31v2FPnrRRy+J1XTt5SXYm/QTB47p+gjX/ADn8K9gtmeDZ9XimDDeHA5q2MGObaWUeqPrVWjFTrZlhnW5jR/CyqwPIgEVKybEqq5uUz21vo92fcA/ku7Y84yV+Q8J94qjl3JwjHv8ARZLaTRz2sqS7rZEc66HQ8WXy8uNF5FiDtDZ8SEi+2XJGckmW1yydc4XgPUVlXu5aMUsp6Hv2f+rMYRb7TcLGzgW8hEb7rZyu8ApOuDz4Vj5jJhEDtl9ZtwJJ1zKJcW1wsu9uRDJVMYBJxnJI151MdVkjKzgw807OzO5JZiWYniSTkk0JydtmjMnuNVIW5aQL7XrUljwZKFGesKVDCOL25EQ6k8B+PlQkz9zdNIckk/cKo2WSPGqknFAKA97ebdqUVZJrOQKAUAoBQCgFAKAUAoBQCgFAKAUAoDQ9gboR30RY4RxJHJ+w8bK3w0P7tal9JKg87dTc4fGUq65d916o3N7btE7I3FTg9D0I8iNffXjZwcJOL6H0CnVVWmprqZntWubd/LdP+IV0uFNK4XxORxqLdrLHkaf6CY8W9w/Wbd+Ean/VXqOh4rB9D2lLuRO4GSqswHmATRtpNozUIRnUjGWzZTbG7R20pVO8XLgEZJB3ifZ14GtaF9Gbw9Dp3P8AD9enTc+XOH07dy9WJ88BjPyrc54nBVBKWSSKxmcjXf5yEfrMfgh/Grx2Zim/aij3bDZB1qqyjadNNalHtnsjY3P52BCeuMN8RrV1LO6yak48j3wYnbH0UxuMQXEigeyjnfQemdR8atyp+RjVbBkrvsTtCz38RJMrKVyviIHUA4IPxpyMuq0Sh2bbvHKQ6lTjgQQfgaxuLW5eEk3oWluvtetDIeJWhU94F60IM/cwSO7Z5Asx5Ko55+XvFUluWSyV+KoScUJFAc0AoQT62CooBQCgFAKAUAoBQCgFAKAUAoBQCgJGzrnupUk/RYE+nA/ImsNzS8WlKHdGe0reDXjU7M+vxYukVMjvUGIzylTkn7Y+z1GnIV49LxVyP3l9fL1PdN/h5eIv5ctX5Pv6Pr8zPbStt9WQ6ZBU9Ry+IqKFR05qXZl7mkq1Nx6NGg+i2zlisTujDGSXPTeB3fh4a9tSqQnBS6M+c3Ma1GTglqjQy3NwE8UeScggelbKjTb3NNXlWEU5wefIw11s6JZEHcSopzv7mcKeXtfyrWq8LoTlzL6Hetv4yq0qXhv/APS1X7n07Zt0hiUgndHh1znQc80lT5Xyo0nV8R8/coLvbE0Du04LQl8pImPAp4Bl4+/WtWpOpRy5rK7rod+hZW17TjG3lyzxqn1fdMm2XaK3mmiRWLPgkeFgACPMVNO5hP2Y9TVuOC16FN1aqWmm5fRHVvWszNHoeVwBmskdjm3XvHg2lX3NNvB5s9WSI5z539JqAS25AGSH9eVKnuIz2r/Na8jKQpxrCdAjBaFSTElQEWG1NkO1gGUZ7yTecj9BMhQfLeyfhSWxeMcow/1Bt7dCknmACfu5VhySoNvCI0kQFCrWDyYUIOtCRQE+tgqKEFld7FkjtobslGinaRAVJLI8fFJAQN1iMkYJyBUc2uC2NMleikkAAkkgADiSTgAeZNSQX1x2RnSW7hLwlrKHv5sM5GAFJVTueJxvAEaDOdarzLcnlPHYHZuS8SaVZreGODu+8ed2RR3hKpgqjcxjXHEVLlghLJOj7FPId2G92dNIfZjjufyjnogkRQT5ZqOctymcvrZ4HeOVGR0JDowwyka6j+s5qyeSuDUXvYR4HMc1/s2OQBSUeeUMu8oYZHc6aEH31RT8i3KUm2dki23cXNrPvZ/7vIz7uMe3vIuM5048DVk8kNYJ9h2QmeJJ5pbe1ik1je5k3DIOsaAFmHngCoc1nAUTptTspPDEbhHguYFOGltpO8WMnh3gwGTPmMefCikmOUoasQKAUAoBQGw7JbY3gIHOGX82eoHL1HLy9K85xWxcZeNT26+T7nrOCcRU4/h6r16ea7G1kK3WjkLPwDnRZegkP2X6NwPPrXNUlW0eku/f18zqShK31gsw7dY+a8vIldldrm0kNtNlVLaZ03HPI/qn/fnXSsLp0n4VT/Rx+K2Krx8ejq/LqiXdbTlWabDnAfAGhHAV6KGsmumh8rvuIV6V04wlpnY1ZgVl1HEVGWng9UqcZpNo6nZ6MhUjTpUeI1LJM6acXHoZ7aHZc8YpWXlgnKkdMGtpXHMsSRoQp1qElOjU+Z4WOyZYr7vu7UxmJU04hgdcAe74VicKWMxWGdn8dcVYeHOWUbCJuPrWBoho6zgYyKtHOxq3EdOYjd4prJytGh4tOW50eIHgaspNbkSpwlsz5x9Ka4nth+rJ8t38amTzFGW2puNVvyRmIRxrHg3epDQammCpMRdKjANhsOcSWjRlgSmV3egOcZqr2NiGphbOELFNM5PhddRngrqcadeB8q1ZS1wbNOKSbZU7ZgBnk3RocN8RrUwehS4h7ehSumDWU1NjoRUEnWhJYVsFBQGw7D/2uG62WTrOvf22eV1CM4H7aDdPktUlo0y0ddDw7AW6pLLfyrmKwj77dOm9OTu28fqZNfVBUy7LqREldi7h5U2vI53newndz1ZnBY/Emon0JieHZ7/wna3rs/8A+yal+8iFsZMirEGt7aSG42ds67kOZnjuYHY+1IlvJuxsx5kAkE881SG7RZ9C8+kbY9pJtCZ5NoxQuVgzG0Fw7Li3iAyyKVOQAdOtRFvGwaWdzMbK2PbttG1txcJcxSSwh3VJEU5fDIVkAPADXh4qs2+XOCFuR+2t/JcX9y8h1E0kajkkcblERRyAA4dcnnSKwhLcn/RndMm0YIxrHcEwTJ9mSJ1IIYcwND7qTWmRHczt/AI5ZI1OQkkiA9QrlQfgKsQzwoBQCgFAcg41HEdOINGsrUJ4eUa/YPaMPiOY4bgH5N5N0PyNebv+FuGalHbt2PW8M40ppUq716Pv6+ZrxMsqiOfkMJLjLIOSv+mnzHLpXOhVUvZqfB/50OpUoSpvno/GPR+nZ/qdrU9y3czjG9grIDoQeB3uBU8j/Q7VrfTglRqP0Z5Hi38PWt3m4pR9rqlozYW23QX7kxsCFznl0rsRfNJnIoVOaThjHKXCEtH4TgkaZqHhS1M8jzC7wCkjIGuOtWUknlGtVo83ss8ktyDkE+lXc01qadOznGScZPB7I511B1+FU9l7G8lXhuekrAD4D46VVbmaU8LUiNZY1DH0NZVVNCpYpvMWR3hO9ugjeGuAdcVdTWDSnbVFLlW582+k4t9btwc+w+PitJtYWDZso1FUnz+X3KSJeNUOj1ISDU+tCpNjGlGQmaPYrhLaZ+YZc+m6cfeaxT2NikZfYdwrRShhvEEuBjOTywOuRmtSW5v0iPY2TOzzSjBc6L0FVctMIiS5m5MrdqWQUmskZGrOBAXZEzjKxtjqdB8TgVmSbNdnhNsqZOMZ92D91TysI7VmIFASNn3r28sc8Zw8TrIp/WU5APkcYPkTRrKwE8Gx7e7es5IhDYE7txM17daMMSsoCxagZCneOmmSMVSMXnLLN9ip7I7Sigi2gsj7pmspIoxhjvSFgQug04cTgVMlnBEXgk9kri2Nnf2s9ytubj6r3bMkjj8lKztpGCeg99RLOU0FseabC2ah3pdqq6DisFtOZW8lMgCqfM6VOZdEThEDtbtwXjIsUfdW8Efc28WclU4lnPN2OpPpx4lGOCM6mn7YW9hf3cl0u1IYxIIhutBckjchSM5IXHFCaiLaWMEvDMvtOyitTHJb30c7ht4GOOVDGyEMrflBg6/dVk290Q/IutoyWG1H+sNcCxuX1nR43e3kf7Ukbx5Me9xKtz+Jqsx03J0YsL2y2VvSwT/W7zdZInWNkt7feG60mZPFLJgkDAxqaYctxojG1cqKAUIFCRQE68vUeGONYgrJ7TjGW0/nx1rUpUJwqzqOWU+nY3a9zTqUIU4ww47vuddobLlgwXXQ4wwOV15Z61ahd0qzag9V06lbixrW6TmtH1WqLLYnaJosJLlo+R4sv4jy4/dWje8LjV9ulo/1Ojw7jMqGKdXWP1X9j6Z2Xu7WRStwytFjeiJyVDfawV1GRjThkda5Vq4U5OncdNsnYvo1KkY1rTru11LDZm2BbSGCXWBsmCQ64Qnw5bmvLqp0Pl0Le8dKfhyfsvZnLu+H+NT8amvbXvLz6mwiPIcBj7q6++pxJQwskCS3jydW144JHzGtWVLTQ1I8QjSnk9dnqsalRI76kguSWAPLJ1IFVjTlBas2at/SuaicUk8bLQzttbyNdmdLgGLQ7iPkMwGDvDgOVVlbp1PETa7o6ceJRVq7eVNN9JdUWG39ozxqpjh7zJ18h7ufuq84yx7G5zade2hJK5UlF9Us4fmXEBLorY1IBptuTLlbzHboVeNy7MjaBlCD1qviLm5e6NFW0ldeLnTGD559Ks2b63HSN/mw/Cs3RG5JYZUIulWMZXqPEfWhDJ8S6CjKI99oX7JbNDoA2WHLJyo489M1r1OxuUdtjG2u0e4fOTjmKwuOUZPE5JG2sQZlXdBO9jA65rDh5wbGVjJeQbAjiG84DP1PAfs5+/jW5TpqJpVajkyFfga6VmMGCnlGulMkow+KAUBY7L2LLcqWQoAp3TvEg5wDyB61pXV/StpKM09e3+zoWfDK13FyptYWmv8Aom/8JXHWL+Jv+mtX/wA1b9n8l+5uf+vXXePzf7EOw2FLPv7hTwMUOSRqOmFOlbNfiNKhy82dVlGra8Kr3PNyNey8PL/sSm7J3AHGM+QY5+agVgjxq2bxr8v7mzL+H7tLK5X8f7FTJaOriNlKsSBg+ZwD6eYroRrwlDxIvKOVK3qQq+FNYl5lhP2dmR0QmPMhYLhmx4V3jnw9BWnDilGcJTSeI4z8fidCpwa4hUhTbWZZxq+iz2JH/CVx1i/ib/prF/5q37P5L9zN/wCvXfePzf7Ee77OzRBSxj8TKgwzcWOBnw8Ky0eKUarainos/L4mGvwa4opOTWrS3fX4HjtDY0sBRXKZkOF3STrkDXIHUVkt7+lXUnDOm+TDdcMrW0oxnj2tsf6Odp7FltwGfdKk4ypJAPnkDGaWt/RuJcsN/MXnC69qlKeMPsc7P2JLOhkQpugkeIkHQZ5A9aXHEKVCahLOX2JteF1rmm6kGsLv/oiWFlJO27GuTxPIAeZ5Vnr3FOhHmm8GrbWtW5ly0ln7Fu3ZK4xnejJ6bzffu1zlxq3zjD+X9zrP+HrpRzmPz/sUtzbvExR1KsOR/rUV1KVWFWKlB5Rxq1GdGbhUWGeVXMYoQWmy9svCNxh3kR0KNrgfq54enCtG5sY1XzwfLPuvudOz4lOivDmuaHZ/Y973ZCuhmtTvp9pPtofTifTj61hoXsoT8G5WH0fRme44fCpB17R5j1j1RE2RtZ7dsrqh9pOR8x0PnWxd2VO4jrv0Zq2PEKtpLMdY9V/nU+ibI2lFcRbjHMTHOceOFzzx06jmNRrivNyhOhLwau3R/dHq41IXMPxFvv1Xfyfn2ZpezW12t5PqlwdDgRvnI19kZ5oRjB93p07K7cH4VT4M5PELONaHjUviv86mpk3QcE613U2eKqU4xeJHRwACQeANS2yaFOKqZTPy80xDsykglicgkHU9RVTfyWlr2rvoR+TuphjkW3x8HyKglbn0Xtd29u7CaKNO7ZTBG7B1OSxLA6qRjh0pLBbmwQbf6Xskd9a5xrlH/kwH31XBZTKntZtxL67gmjVlUx8GxnjnkTVyJyzgkqNKuzF1K1EO83TNWjFvYq2i/ttkSsqsRugk+1oQBqTjpWGpVjB4M1O3lNZMp2vuGMhU+HcXAHloB+Na1N8zcjYrLkSiiktNj3Nwu/HC7rnG8B4c89TpWRJmDzZ9X7HW5toh3yjfAwACDjrkjTPKphSw8syzq5iool7Svyx0HDrqPcKz5MDKS6dm40yQV8i1BOTDkVJUUBsew/5qT/3P9C15njf86Pp9z2H8O/yJ+v2OkmxXAJ+uyaAn2jyH7dTC+i2l4K+RWfDZpN/iH8/7nPYY5SQniXBP8NONrFSC8vuP4dbdKo/P7FCu2J45SRK5wx8LMSpG9wwa6zsqFSjhxW2/wOJHiNzTrtqb32+JpO1UIPcPjDCZF88E5I+IFcXhc5J1IdOVnoeM04yVKo1rzL6nh23kKiEqSCGfBBII0A0IrJwSKk5prTQw/wARTlCNOUXh5f6Ht2Nnd4nLszEPjLEk43V61TjFOEK0FFY0+5k4DVnUoTc23r19DM2t1I80YaR2HepoWYjRxyJrt1KNONCTjFJ8vbyPPUrirO5ipSbXN1fmaHtf+ctv2/8AUlcbhH8ur6fZne47/No+v7F7ed235J8HvA2AeeMZx56591cqj4kfzYf9Tt3HhTSo1P8AsQtkbPNvFJGTkbzlT1UqMZ862bu5VxVhNeWfU07KzdrQnT83j0wQuzv5GyMijLbsjnzK5AHyra4hmreqnLbRGnwtKhw91YrXV/Iz+zr25kmXclbfY/aY7hwM4K8MadK7Fxb21Oi+aCwuy1OBa3N5Wrrkm+Z93oeO2IpUlYTMGcgEkHIweGNNPSstnOlOinSWEYb+nWhXarvMtyDW0aYoBQEnZ93JC+/GcHn0I6MOYrDXt4V48s0Z7a6qW8+em8fo/UupraO8UyQALMNXj/S818/P44rmQrVLKXh1tYdJdvU69ShS4hB1aCxUW8e/mipsL2S3feXQ8GU8D1DD+sV0bi3p3NPD+DOXa3VW0q80fivsfSNkXiX8IQHxjPdZ4g8TC3keK+frXm50Jwl4M917r7+R6uncQqR/EU/dfvLs+/790etptPacj7kM9thFHhud5W00wGUanhx19a6theuUeSb1RweNcOhF+Ml7L+hdxXe1xo1rbTAgg91cqD7gwrpeJ3OFTowjLKf6Gcs+yKwypL/2VdqVOcLJDKnvBkOR7qvzxybKwZztDDsy5nkb6w9u+SrRtCQqsuhBwBg5HWp5osNJlx2gs7LaN5HL9ciMQiSNlDYfw7xyP4qLD1J5UVnaDsJCkZktZjIw4ISuo9dKlwWNA4dihSJklhRhhlQAjTT4U6mOW6NQPZqzKLc9+x1pHPdFZAGCq7bp1G9lQCRwOMmrTk1S0JopSq4ZstpS5OOpNcarU1wdqEDG3/ZX67cDUqmpkYch0GeZrNbvm0RrV441ZrQqwx92gCqAFA5ADgK3ttjSKq4UDLLwPEUyVZEeSmQR5DUAhyCpBg6sQKA03ZTaUMMbiRwpL5A14bqjkPI1wuK2latUjKms4X3PS8EvqFCjKNWWG39jk2uzP0/m/wCFV8Tif9P0RPg8G/q+rO3ZzaEEHfAuApkJT2jleA5VHEbW4r8klHLxr6luFXlrbqpGUsJy09Duj7NjbvAcsDn/AJja5znHDjVHHiU4+G9Ft0RdT4RTn4qeXv1evoVm19t/WJY8ArGjqdeJ1GWOOGnKt204f+HpS6ya/wARzr7in4qtDGkItP8AuSe1u0YphGI3DYLZwDpkDqKxcJtatCUvEWMmxxy9oXEYKlLOGzv2U2nDDG6yOFJfIGDw3QOQ8qrxS1q1qsZQWUl9y3Bb6hb0ZxqSw2/sUFnIFlRicASKSfINmutVi3RcVvjH0OJRnGNxGTenNn4ZL7tJtKKV4Cjhgj5bQ6DeU8x5GuTw20rUoVFNYytPqdvi17Qr1KTpyzh6/Q47VbUjl7owyZKFjkZBHs4Oo8qcLs6lNTVWOjI41f0qvhujLVNljY9pYni/KsEfBBGDgnHEY69K06/CqsK35azE6FvxqjUoYqvEsY9fMp+zW3RAvdSAlDqCBndJ45HMGulxHhzrvxKfvHJ4TxWNtHwqvuv6FlA2zonEyuARkgAuQMgjRcefCtGa4jVh4Uo6f51OjTlwqjU8eEtV6/oUG3r5Z5jIgO7gAZ4nHPFdiwt5UKKhLc4PE7qFzcOpDbz8iurcNA5oDtjHH4VJAJoDvBM0bB1JDDUEVSpTjUjyyWUXpVZ0pqcHhrqX0sa36F0AW4UeJeUg6jz/APzoa5EJTsJqEtab2fY7s4U+Jwc4LFVbr+rzKrZe0HtpN4Z44ZeGcH5EcjW/dW0Lmn+jOZZ3c7SrnGm0l3PpU1wJ40vYiM5Heaf8zkxHRsHI/SDda87U56U+faSev7+jPUU1Sr0/CesJLMfTqvVGz2UYLmJZRFHk6MN1cqw4jh/QIr0ttXVampo8BfcP/DVnTa9PNFZ24QQWMzxZjfwYZCVYeMcCp0raik2asfYax1Z8jh2asiB21ZhvEnJJJ1JJ5mq4RvkW72dAntMB5cT8KjkRKyV8Uiq5EYB0YEscDGOIORg6aGq5Sehk17mqu7CP62+6Au7HE4AJIZWjU7wJ9atF53I7Eq8uO6iDEHGQPjVtNiHlakXst2hhsrhpZSQskbhcAk5LqQdOA8BFY679nCMtu1GfMzQ7M2v/ANozBYM4wC7a+Bc6kgge7rXNVrKUtTpO6jjQ2hVYl3V4fMnqa34QUFiJozm5vLKe8lqxjK0y645GhDIbjBxUkHmxoCLIaAwdXIFAKAUAoB/WlAcYqCTigFAKAUAoBQCgFAKA7BaEHOelSDigFAKA9Ledo2DqcMpyD/XKqVKcKsXCSymZKVWdKanB4aNNLsoXyrcJiNmyHBBwWGmRj041wYXrsZuhP2ktvQ9JPh64lTjc0/Zk9+zaOOyu0zY3DW9x+Zk/JyjiF3sEOPTwt7h51u16cLmmq0O30/dHOt6lS0quhU6PK8n+z6n0Ds3dtZ3TQSEbjndPQN9hh5EEe5h0rm2NV0a3hy2Z0+LUI3Nsq8Vqtfh1+RafSSwOz5uH2P8AOK9NTTyzwdWtCUoJY1Z8QvtpOkcaIQPAMn7X+1RKWNjfiu5SOSdSdT8awtvqZDoajJY13YS4T6yomOEl3VLNw8PAZPI6ColU8ODkWhT55pG57f7ThihkDFSXBRY9M5xoQvIDjXEtqlStXzr3z0OxcRhTo4eNj523Z+WaGOdeBXdUaYwpIJJLaZO8eHOutVuIxnhnOp2k50+ZH0L6M9jG1t3lf25iABngkeQPeWLH4VsQaccowuLi8MvruapIKe6lqCCA0lSRg8rkk4b3fCpIwRmkpkHg7UBiKyFRQCgFAKAUAoAaAYqAcbpoSKA4oBQHIoDndoQKkCgFAKAUAoBQGi2F2jWCMROpIBOGXGgJycg+ZPCuJf8AC5V6jqQevZnoeGcZjb0lSqReOjX3IvauFhOXJysgVkI4boUDH9da2eFTj4HJs4vU1eNU5K5dR6qSTT8sGp2Re/WrNHY5ktyLeQ82TBaBj+6GTP8AdiufxS38OSqROjwa58SMqM/X9yVaCMxxRTRq6yXKQjxMGYOVPFRneXLHU4IArq2ly61NPr1PLcQsIULpwhhPfRLOGfOu1MSx3U0SZ3YpJIlzxwjsoz7gKzyeSYLC1KqqljvbRqzqrNuKSAWwTujmcDjVZPCzjJeKTeGSdo3asSqABF8K4HtAaZPmePvqsY9WXqTzovoREVnIAyWYhR1JJwBV0kkU1kz6rc2pjjit0OSqpENeLaAn+I5rkSn4tbQ76h4VHHkbQRd1GkQ+wqrgeQAJPSu1ssHBk8vJUXlwoOAd5ug4D1NCCsnJ4nSoBBEmWwKA89pTgeEH2ThvXGcVKKsjqdKA8nNSDG1lKCgFAKAUAoBQCgFAKA5zQDNAM0AzQHFAKAUAoBQCgFAKAUBf2P8AabVoeMkPjj6leY+8fw1x6/8AxbpVV7s9H6ndt/8AmWUqD96GsfTsevYG6xcNB9m5jaPH94o7yE+u8m7/APIa3ryiqtJx+RzbG4dCtGfz+5dXW2jaqj43o++hkfAG9uo4bw5OATgD31x+FVeWbpvr+p3OOUFOnGtHp+jMDt28W4uZplBCyyySAHGQHctg4PHWu3oeZWSFuHofhUFsM47s9PlUDU4K1IyaLsJZB7kSPjdhHea824INfPX92te5k403ym3ZQUqqcuhsI7gXF0ijJAYO500RSCdR6Y94rRs6Ek8yOnd1k1yo29xIkwJUhl54P3j8a6+Uziyi47lTdZTRFUeZ/kBUlMlHevxLNk/KoBT2N6FMkh+yBujzPCjCZxBGWVcjOSXJOmSftHy6DypkHu56GgZ4tUkGPrMUFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoCbsa87mZH5Zw37LaH4cfdWre0PGoSj13XqbvD7j8PcRn02foyRtMGzu99PsOk6e5g4HxBHuqlhW8a3Te+z+BfiVv4FzKK2eq9GazaCJ3k8RUSIkrELkqGicCaIZGo8DqM+VcW8pypXHNF4z17Pqdyzn+JsnTe60/YzW0hGYhuWYhc7hDmaQ465DqF8XrpXSo0a0Jpzq8y7YS+55yaXK8LYprm9Vt3OhVQp3OePtHJ4ny0rfm89Ea1KPLnLerySYlFwyi3jlLAZZQ28SRxOBjT0zVJzgktMF6NOrLOXn0WyPeNjDL3dzbDUey4YMoY6MPTFUzGWqZmxKHszj+5cz2XdIyIgUFvH0GNBx99UqVYxS13NilQk28LYu9n231SHH/ADJcF+oX7K/zPr5VinPljjqbFOll5ZAlvHjbeRip6j+fWsUJvOUWqRT3JFv2vXOJxj9deH7y8vdW9Crnc51WnyvQh7Y2kr6qQQeBBrKa5mYZN+URjVd4Mw645acagjqazcz4mOeg1wBy0qplOHqxGCO5qSDHVmMYoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFADQF7tg99awT81zE/u4Z/h/xVyLP8q6qUej1R3L/8+zpXHVeyy0SfMls3KexhBPWS3LwH37sX3U4pTzS5uz+jHBa3LWcP6l+ht9l2Vr9VXetYnLDLnAG+4zlmAGCfOvPVOKVI1cfc3vwMXlZ+hge1LWSOAtkqYz7LYz7gK9BY13UhlnJvbdU54R7dhL62jndxEVIjIU5ycllGPeM1a5y0k3g2LCnlvlWuDX3dzCpa8MfiVBHGrp4u8BZ8jIyPariXU5TcbelLR6ya7HRhQUpucuhWBQCM4O7qc/akOpPoDWzTrJy5/gvREOlyx5fmRNoXJY5JrOpuT1MMopFDe3GlbMEadR4M9eT7xxxrbiklk59SXM8IkbX2RPZrEXO6ZVLbo+yQRkHzwR8aw215TuHJQ6P5lrm1nQUXPr9Dr2fjPeb2Mjn+IPI1tN4Rrx1ZtPrkQGCzA+dFhltSNJew/pk+gNSVIkl6v2UY+Z0qwyZesxjFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQF5sr8paXEXNcSD3a/6PnXJu/wAu7pVO+h27H82xrUu3tI9RL/ZbCT/0p7mA+jGKUfKV63bqHPTnHyOfaVPDrQl5r9j6PsN822Ohcf4if518+u44rZ8kev8A+7PmXbI/lvjXquF/yjg8Uf5iKmz2tNbZaJt3ewG0B0Go4+ddB04T0ksmh4s6azB4J0vbO7lKCSVmC6aheBP7ORppx51hdjSjlxXTBajcuOItvHNzPXd/t5Gwv7wAZHMZ/nXn6MJc2D01TbJn7y+0rr0oHMqzwUF7d5roU4HLrVOhH2ftAwSrKFVmU5AYZGeR9RU16Kq03BvGexioVfCmp4zjuW+3e1LX0axyRqGVt5WGehBGPP8AlWnZ8OjazbhLR9Dbu7/8RTUXHDRM7PQ4XPX+Vb8nrg0qawsllKdc4oiWRpZfIVcoR2kqSGzP1nMYoBQCgOKA5oBQHFAc0AoBQCgFAKAUAoBQCgFAKAUAoBQCgLvsi35Zk5PGw+7+Wa5XF1+SpdpI7XA3+fKn/VFo6WqlrC5j5wTQXA64bft3+bxV0d8PujkNcuV2Ppf0dsk8UwcZG8jjUjAeJNNPNSffXk7m2g5LmWqyvk2eldxPPNF74fzRmfpD2JCrqUDAnJJ3s/I117CCjT0OZe1HOa5mfPb1tx8LkYHPz45/Ct1LK1NOUnFpxI+6ScgaZ4cvSrbFMOTykfQblE7mN1PGNfjujPzrzUXLxpJ92eq0dKL8jKbRnxXaowONdVMFUAWNbeyObrJnr9Qfjumq+JDuZPw9TsdBbsDoDmp549yrpT6o2do4CLjhgVRPLMrWEcXMo4g1dGIhy7RUDBX31dFGzwa7jP8AvUkZKqs5QUAoDigOaAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUBa9lz/ao/wB//I1c/in/AMWXwOpwZ/8AMh8f0Jewx/aLxfsta34I67qNIvwZFP7tbNH+TB+S/Q0q386fq/1NP9G87BWAOhijPvDyAfKubWgnN57v9EdCMmqcP/qv1ZC7SuWwTx3B5fIaCtykkoaGjVeZvJgb/wDOH0FZI7GOr7xOtFGBWvW3OnaJcpI2rKyqoBIGDWrQipSbaNu9k4xXKUMrE8a34o4c229T3t2xqOP9daieuhenozs20peAcgeWB9wqqoU3rgmdzV25jwkmZuLE+pNZOVLZGJzk92X2xmPccftMPdx/nUdS0XmJMbVasirIBUE++pKidQSc1JVn/9k="
              alt=""
              className="rounded-[10px] w-[150px] h-[150px] sm:w-[210px] sm:h-[150px] "
            />
          </div>
          <div className="text-white flex  my-[10px] gap-5">
            <div className="bg-red-600 text-white text-[20px]  rounded-[20px] w-[220px] text-center ">
              Video Editing by John
            </div>
            <p className="text-white text-[20px] bg-green-700 rounded-[10px] px-[10px] ">
              ₹999
            </p>
          </div>
          <div className="Livestudents text-white">
          {props.enrolledstudents}
            Enrolled By :  10 Students
          </div>
          <button type="submit" className="bg-green-400 text-[25px] rounded-[20px] w-[200px]" onClick={handlePayment} >Buy Now</button>
          {/* <button
            className="bg-green-600 text-white w-[140px] h-[30px] rounded-[40px]"
            onClick={() => {
              setDatatosend(props.teacher);
              sendDataToParentHandler();
            }}
          >
           {/* <Link to={`/Course/${props.courseName}/${props.idpassed}`}>Watch Course</Link> */}
          {/* </button> */} 

        </div>
      </>
    );
  };
  const topcourses=[1,1,1,1];
  return (
    <>
      <div className=" h-[50px] bg-yellow-500 rounded-[20px] w-[290px] ml-[100px] mb-[30px] text-[30px] px-[3%]  ">
        Top Courses
      </div>

      <div className="TopCoursesCarousel grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topcourses.map((index)=>
          (
           <TopCoursescard key={index} ></TopCoursescard>
          )
        )
      }
        {Courses.map((data, index) => (
          <>
            <TopCoursescard
              key={index}
              idpassed={data._id}
              className="col-span-1"
              courseName={data.courseName}
              InstructorName={data.Instructor.name}
              enrolledstudents={data.studentsEnrolled}
              price={data.price}
              image={data.thumbnail}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default TopCourses;
