
$(document).ready(function () {
    debugger

    $('#formCadastro').submit(function (e) {
        debugger
        e.preventDefault();

        if ($("#CPF").val().length == 14) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "CPF": $(this).find("#CPF").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val()
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        else
                            ModalDialog("CPF cadastrado", "Esse CPF já está cadastrado!")
                    },
                success:
                    function (r) {
                        ModalDialog("Sucesso!", r)
                        $("#formCadastro")[0].reset();
                    }
            });
        }
        else {
            ModalDialog("CPF inválido", "Verifique o CPF");
        }


    })





    $('#CPF').mask('000.000.000-00');
    $('#CEP').mask('00000-000');
    $('#Telefone').mask('(00) 0000-0000');
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function ListBeneficario() {
    if (document.getElementById("gridBeneficiario"))
        $('#gridBeneficiario').jtable({
            title: 'Clientes',
            paging: true, //Enable paging
            pageSize: 2, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: urlBeneficiarioList,
            },
            fields: {
                Nome: {
                    title: 'CPF',
                    width: '50%'
                },
                Email: {
                    title: 'Nome',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                }
            }
        });

    //Load student list from server
    if (document.getElementById("gridBeneficiario"))
        $('#gridBeneficiario').jtable('load');
}

function ModalCadBeneficiario() {

    var texto = '<div id="form-Cad" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">Beneficiários</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <div class="row"><div class="col-md-4"><div class="form-group"><label for="CPF">CPF:</label><input required="required" type="text" class="form-control" id="CPF-Benefiario" name="CPF-Benefiario" maxlength="14" placeholder="Ex: 010.011.111-00"></div></div><div class="col-md-4"><div class="form-group"> <label for="Nome-Benefiario">Nome:</label> <input required="required" type="text" class="form-control" id="Nome-Benefiario" name="Nome-Benefiario" placeholder="Ex.: João da Silva" maxlength="50"> </div></div> <div class="col-md-4"> <div class="form-group"><button type="button" onclick="IncluirBeneficiario" class="btn btn-sm btn-success">Incluir</button> </div></div></div> <div class="row"><table id="gridBeneficiario" class="table"></table> </div>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#form-Cad').modal('show');
}

function IncluirBeneficiario() {

}
