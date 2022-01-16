var app = angular.module("MyApp", []);

app.controller("Ctrl", function ($scope, $http) {


    $http.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898').then(function (result) {
        $scope.dados = result.data.results;
        for (var i = 0; i < $scope.dados.length; i++) {
            const element = $scope.dados[i];
            // console.log(i)
        }

        $scope.data = Array.from({ length: $scope.dados.length }).map((_, i) =>
            `<section class="pokemons">
             <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(i + 1)}.png" alt="pokemon-img">
             <div class="info">
                 <h4 class="nome-do-pokemon">${$scope.dados[i].name} #${(i + 1)}</h4>
                 <p>Características do pokemon dolor sit amet, consectetur adipiscing elit. In ultricies nunc at odio
                     tempor tincidunt. Sed sit amet dolor velit. Donec convallis tellus ut porta molestie. Suspendisse
                     condimentum et dui in aliquam.</p>
             </div>
         </section>`);

        $scope.totalItem = $scope.data.length;
        $scope.perPage = 20;
        $scope.state = {
            page: 1,
            totalPage: Math.ceil($scope.data.length / $scope.perPage),
        }


        // Controles ==================================
        $scope.next = function () {
            $scope.state.page++;
            if (lastPage = $scope.state.page > $scope.state.totalPage) {
                $scope.state.page--;
            }
            $scope.update();
            fazPopUp();

            document.body.scrollTop = document.documentElement.scrollTop = 200;
        }

        $scope.prev = function () {
            $scope.state.page--
            if ($scope.state.page < 1) {
                $scope.state.page++;
            }
            $scope.update();
            fazPopUp();
            document.body.scrollTop = document.documentElement.scrollTop = 200;
        }

        $scope.goTo = function (page) {
            $scope.state.page = page;
            if (page > $scope.state.totalPage) {
                $scope.state.page = $scope.state.totalPage;
            }
            if (page < 1) {
                $scope.state.page = 1;
            }
            $scope.update();
            fazPopUp();
            document.body.scrollTop = document.documentElement.scrollTop = 200;
        }
        // Controles =================================


        $scope.create = function (item) {
            const div = document.createElement('section');
            div.classList.add('pokemon')
            div.innerHTML = item;

            document.querySelector('.container_pokemons').appendChild(div);

        }

        $scope.update = function () {
            const lista = document.querySelector('.container_pokemons')
            lista.innerHTML = '';

            let page = $scope.state.page - 1;
            let start = page * $scope.perPage;
            let end = start + $scope.perPage;
            const paginatedItems = $scope.data.slice(start, end);
            paginatedItems.forEach($scope.create)
        }

        $scope.dropBtn = function () {
            $scope.btn = document.querySelector('.dark-button');
            $scope.btn.classList.toggle('hidden');
            $scope.btn.classList.toggle('show');
            document.querySelector('.seta').classList.toggle('close-seta');
        }
        $scope.darkMode = function () {
            document.body.classList.toggle('darkActived')
            document.querySelector('.barra-lateral').classList.toggle('darkBarra');
            document.querySelector('.itemQtd').classList.toggle('itemQtdDark')
            document.querySelector('.search-box').classList.toggle('dark-search-box')
            document.querySelector('.apagar').classList.toggle('ascender')
        }
        $scope.fecha = function () {
            let btn = document.querySelector('.dark-button');

            if (btn.classList.contains('show')) {
                btn.classList.toggle('hidden');
                btn.classList.toggle('show');
                document.querySelector('.seta').classList.toggle('close-seta');
            }
        }



        $scope.fechaPopUp = function () {

        }
    })

    setTimeout(() => {
        $scope.update()
    }, 500);

    function fazPopUp() {
        setTimeout(() => {
            let cli = document.querySelectorAll('.pokemons');
            cli.forEach((cli) => {
                cli.addEventListener('click', () => {
                    let pop = document.querySelector('.popup-container')
                    pop.classList.remove('some')
                })
            })
        }, 1000)
    }
    fazPopUp();

    $scope.closeando = function () {
        let pop = document.querySelector('.popup-container')
        pop.classList.add('some')
    }

})
