  function listNuts() {
          $.ajax({
            type: "GET",
            url: "/listNuts",
            dataType: "json"
          }).done (function (data) {
            alert(data);
            console.log(data);
          });
        });
      });