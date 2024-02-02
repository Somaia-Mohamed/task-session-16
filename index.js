function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const gallery = document.getElementById('gallery');
  let sliderContent = document.getElementById('sliderContent');
  let currentSlideIndex = 0;

  const files = fileInput.files;
  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageSrc = event.target.result;
      var imageName = file.name.split('.').slice(0, -1).join(''); 
      console.log(imageName);
      const img = document.createElement('img');
      img.className="image";
      img.src = imageSrc;
      var contents=document.createElement('div');
      contents.className="contian";
      var title=document.createElement('P');
      title.className='title';
      title.setAttribute("id", "title")
      const buttonDel=document.createElement("button");
      buttonDel.textContent="del image";
      buttonDel.className="del_button";
      // imageElement.addEventListener('click',openSliderModal(this))
      buttonDel.onclick = function() {
          gallery.removeChild(contents);
      
      };
      img.addEventListener('click', function () {
        openSlider( imageSrc, img );
    });
      const edit_btn=document.createElement("button");
      
      title.textContent=imageName;
      contents.appendChild(img);
      contents.appendChild(title);
      contents.appendChild(buttonDel);
      edit_btn.textContent="edit image";
      edit_btn.className="edit_btn";
      contents.appendChild(edit_btn);
      edit_btn.onclick=function(img) {
        const editedNameInput = document.getElementById('editedName');
        editedNameInput.value =title.textContent;
        const edit_modal=document.getElementById("editModal");
        edit_modal.style.display = 'flex';
      }
      gallery.appendChild(contents);
    };

    reader.readAsDataURL(file);
    
    const saveButton=document.getElementById("save_btn");
    saveButton.onclick = function(){
    const title=document.getElementById('title');
    const editedNameInput = document.getElementById('editedName');
    title.textContent= editedNameInput.value;
    closeEditModal();
};
  }
  function saveEdit(event){
    const title=document.getElementById('title');
    const editedNameInput = document.getElementById('editedName');
    event.target.title.textContent= editedNameInput.value;
    closeEditModal();
  }
}
function confirm_del(){
  const modal=document.getElementById("model");
  modal.style.display = 'flex';
}
function del_all(){
  const gallery = document.getElementById('gallery');
  gallery.innerHTML='';
  close_model();
}
function close_model(){
  const modal=document.getElementById("model");
  modal.style.display='none';
}


function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none';
}


function closeSlider() {
  const slider = document.getElementById('slider');
  slider.style.display = 'none';
  document.removeEventListener('keydown', closeSliderOnEsc);
}

function closeSliderOnEsc(event) {
  if (event.key === 'Escape') {
      closeSlider();
  }
}

function openSlider(imageURL, name) {
  const slider = document.getElementById('slider');
  sliderContent.innerHTML = '';

  const galleryImages = document.querySelectorAll('.contian');

  galleryImages.forEach((imageContainer, index) => {
      const img = imageContainer.querySelector('img').cloneNode(true);
      const imageName = imageContainer.querySelector('.title').innerText;

      const slide = document.createElement('div');
      slide.classList.add('slider-slide');

      const slideImage = document.createElement('img');
      slideImage.src = img.src;
      slideImage.alt = imageName;
      slideImage.className="slideImage";

      const slideName = document.createElement('h1');
      slideName.innerText = imageName;
      slideName.className='slideName'
      slide.appendChild(slideName);
      slide.appendChild(slideImage);
      

      sliderContent.appendChild(slide);

      if (img.src === imageURL) {
          currentSlideIndex = index;
      }
  });

  slider.style.display = 'flex';
  document.addEventListener('keydown', closeSliderOnEsc);
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function prevSlide() {
  showSlide(currentSlideIndex - 1);
}
function showSlide(index) {
  const slides = document.querySelectorAll('.slider-slide');

  if (index < 0) {
      index = slides.length - 1;
  } else if (index >= slides.length) {
      index = 0;
  }

  currentSlideIndex = index;

  slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'flex' : 'none';
  });
}


