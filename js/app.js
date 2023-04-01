const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools))
}

loadData();

const spinner = isSpinning => {
    const spinner = document.getElementById('spinner');
    if (isSpinning) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

const displayData = ais => {
    spinner(true);
    // console.log(ais.length);
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.textContent = '';
    ais.forEach(ai => {
        // console.log(ai);
        const { id, name, description, features, image, links, published_in } = ai;
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('max-w-sm');
        containerDiv.classList.add('bg-white');
        containerDiv.classList.add('border');
        containerDiv.classList.add('border-gray-200');
        containerDiv.classList.add('rounded-lg');

        containerDiv.innerHTML = `
    <section class="p-6 bg-slate-50">
        <div>
            <img class="rounded-t-lg"
            src="${image}" alt="Image" />
        </div>

        <div>
            <div>
                <h5 class="text-2xl font-semibold font-work-sans">Features</h5>
            </div>
            <ol class="font-work-sans font-normal text-base text-slate-500">
                <li>${features[0]}</li>
                <li>${features[1]}</li>
                <li>${features[2] ? features[2] : ''}</li>
                <li>${features[3] ? features[3] : ''}</li>
            </ol>
            <hr>
            <button onclick="showDetails('${id}')" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="flex justify-center items-center gap-36 mt-4">
                    <div>
                        <h5 class="text-2xl font-work-sans font-semibold">${name}</h5>
                        <p class="text-slate-500"><i class="fa-solid fa-calendar-days mr-2"></i>${published_in}</p>
                    </div>
                    <i class="fa-solid fa-arrow-right text-rose-400"></i>
                </div>
            </button>
        </div>
    </section>
        `;
        cardsContainer.appendChild(containerDiv);
        spinner(false);
    })
}

const showDetails = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}

const displayDetails = details => {
    // console.log(details);
    const { description, pricing, features, integrations, accuracy, input_output_examples, image_link } = details;
    // console.log(accuracy);
    const accuracyPercent = (accuracy.score * 100) + '%' + ' accuracy';
    // const modalDetails = document.getElementById('modal-details');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
<section class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="border border-rose-400 bg-rose-50 p-8 rounded-2xl">
        <p class="text-2xl font-semibold">${description}</p>

        <div class="grid grid-cols-3 text-base font-extrabold font-inter">
            <div class="text-green-500">${pricing[0].price}/<p>${pricing[0].plan}</p></div>
            <div class="text-amber-500">${pricing[1].price}/<p>${pricing[1].plan}</p></div>
            <div class="text-rose-500">${pricing[2].price}<p>${pricing[2].plan}</p></div>
        </div>

        <div class="grid grid-cols-2 font-work-sans">
            <div>
                <h4 class="text-2xl font-semibold">Features</h4>
                <div class="text-slate-500 font-base font-normal">
                    <p>${features['1'].feature_name}</p>
                    <p>${features['2'].feature_name}</p>
                    <p>${features['3'].feature_name}</p>
                </div>
            </div>
            <div>
                <h4 class="text-2xl font-semibold">Integrations</h4>
                <div class="text-slate-500 text-base font-normal font-inter">
                    <p>${integrations[0] ? integrations[0] : ''}</p>
                    <p>${integrations[1] ? integrations[1] : ''}</p>
                    <p>${integrations[2] ? integrations[2] : ''}</p>
                    <p>${integrations[3] ? integrations[3] : ''}</p>
                    <p>${integrations[4] ? integrations[4] : ''}</p>
                    <p>${integrations[5] ? integrations[5] : ''}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-sm border border-slate-200 rounded-2xl p-6">
        <span class="text-white rounded-lg bg-rose-400 px-4 py-2 absolute">${accuracyPercent}</span>
        <img class="rounded-t-lg" src="${image_link[0]}" alt="Image">
        <h4 class="font-work-sans text-2xl font-semibold ">${input_output_examples['0'].input}</h4>
        <p class="text-slate-500 text-base font-normal ">${input_output_examples['0'].output}</p>
    </div>
</section>
    `;
}