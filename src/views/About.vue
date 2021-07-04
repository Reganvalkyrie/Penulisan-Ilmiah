<template>
  <div class="about">
      <h1 class="head-title">Dota Information About Page</h1>
    <div class="header-container">
      <div class="text-container">
        <p>
          Halo !! Nama Saya Regan Giri Karuna dan saat ini saya sedang menjalani
          semester 6 di Universitas Gunadarma. Saya mengambil jurusan Teknik
          Informatika dan mendalami pemrograman web.
        </p>
        <br />
        <p>
          Projek web Dota Information ini saya buat untuk memenuhi syarat
          kelulusan yaitu Penulisan Ilmiah.Website ini merupakan website dinamis
          yang bisa melihat permainan-permainan seluruh player Dota.
        </p>
        <br />
        <p>
          Website in dibuat dengan menggunakan API dari:
          <ul>
            <li> <a href="https://docs.opendota.com/">OpenDota</a></li>
            <li> 
          <a href="https://docs.stratz.com/index.html">Stratz</a></li>
          </ul>
        
        </p>
        <br />
        <p>
          Website ini masih sangat jauh dari kata sempurna. Maka dari itu, bagi
          pembaca atau pengunjung website yang ingin mengembangkan web ini akan
          sangat diperkenankan untuk memakai source code web Dota Information
          ini
        </p>
       
          <ul>
            <li> <p><a href="https://github.com/Reganvalkyrie/Penulisan-Ilmiah"
            >source code</a
          >
        </p></li>
            </ul>
      </div>
      <img class="photo-profile" src="@/assets/foto putih.png" alt="" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "About",
  components: {
    Footer,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body{
  background-image:url('../assets/backgroundDaun.jpg') ;
}
.head-title{
  margin-top: 5px;
  padding-top: 5px;
  margin-bottom: 10px;
}
.header-container {
  display: flex;
  margin-left: 20px;
}
.text-container p {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: justify;
  align-items: left;
  width: 550px;
  font-size: 20px;
}
.photo-profile {
  position: relative;
  margin-bottom: 100px;
  transform: translateY(-72px) translateX(700px) scale(1.5);
}
</style>
