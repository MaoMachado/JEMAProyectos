window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("btnBackToTop").style.display = "block";
  } else {
    document.getElementById("btnBackToTop").style.display = "none";
  }
}

document.getElementById("btnBackToTop").onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
